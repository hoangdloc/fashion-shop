import { NextFunction, Request, Response, response } from 'express';
import fs from 'fs';
import jwt from 'jsonwebtoken';
import { MongoClient } from 'mongodb';
import path from 'path';

import AppError from './../utils/appError';
import { sendEmail } from './../utils/email';

import { OTP } from '../models/otp';
import { User, UserRole } from '../models/user';

type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;

const users: User[] = JSON.parse(
  fs.readFileSync(path.join('./src/data', 'users.json')).toString()
);

const signToken = (userInfo: Optional<User, 'password'>): string =>
  jwt.sign({ user: userInfo }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });

const createSendToken = (
  user: User,
  statusCode: number,
  req: Request,
  res: Response
): void => {
  const infoUser: Optional<User, 'password'> = Object.assign({}, user);
  infoUser.password = undefined;

  const token = signToken(infoUser);

  res.cookie('jwt', token, {
    expires: new Date(
      Date.now() + +process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    secure: req.secure || req.get('x-forwarded-proto') === 'https',
    httpOnly: true
  });

  res.status(statusCode).json({
    status: 'success',
    data: {
      token
    }
  });
};

const createOTPCode = (): string => {
  const digits = '0123456789';
  let OTP = '';
  for (let i = 0; i < 6; i++) {
    OTP += digits[Math.floor(Math.random() * 10)];
  }
  return OTP;
};

const signup = (req: Request, res: Response, next: NextFunction): void => {
  const { email } = req.body;

  const existedUser = users.find(user => user.email === email);

  if (existedUser) {
    return next(new AppError('User with this email existed!', 409));
  }

  const newId = users[users.length - 1].id + 1;
  const newUser: User = Object.assign(
    { id: newId },
    {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
      password: req.body.password,
      role: UserRole.USER
    }
  );

  users.push(newUser);

  fs.writeFileSync(
    path.join('./src/data', 'users.json'),
    JSON.stringify(users)
  );

  createSendToken(newUser, 201, req, res);
};

const login = (req: Request, res: Response, next: NextFunction): void => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError('Please provide email and password!', 400));
  }

  const user = users.find(user => user.email === email);

  if (!user) {
    return next(new AppError('This user does not exist!', 401));
  }

  if (user.password !== password) {
    return next(new AppError('Incorrect email or password', 401));
  }

  createSendToken(user, 200, req, res);
};

const logout = (req: Request, res: Response): void => {
  res.cookie('jwt', 'loggedOut', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true
  });
  res.status(200).json({
    status: 'success'
  });
};

const forgotPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { email } = req.body;

  if (!email) {
    return next(new AppError('Please provide an email!', 400));
  }

  // Check if user existed
  const user = users.find(user => user.email === email);
  if (!user) {
    return next(new AppError('There is no user with email address!', 404));
  }

  // Generate new OTP code
  const otpCode = createOTPCode();

  // Initialize connection to MongoDB
  let client;

  try {
    client = await MongoClient.connect(process.env.OTP_DATABASE);
  } catch (err) {
    console.error(err);
    return next(new AppError('Could not connect to database', 500));
  }

  const db = client.db();

  // Remove old existed OTP code and update new OTP code
  try {
    await db.collection('otp').deleteOne({ email });
    const newOTP = new OTP(
      email,
      otpCode,
      new Date(),
      new Date(+new Date() + 60 * 1000)
    );
    await db.collection('otp').insertOne(newOTP);
  } catch (err) {
    client.close();
    return next(new AppError('Storing to database failed', 500));
  } finally {
    client.close();
  }

  // Send OTP through email
  const message = `The secret OTP for reset password process is ${otpCode}. Please DO NOT share this OTP code to anyone else.`;

  sendEmail({
    email,
    subject: 'Your OTP (valid for 1 minute)',
    message
  });

  res.status(200).json({
    status: 'success',
    message: 'Email was sent successfully!'
  });
};

const resetPassword = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { email, password } = req.body;

  if (!email) {
    return next(new AppError('Please provide an email!', 400));
  }

  const newUsers = users.map(user => {
    if (user.email === email) {
      return { ...user, password };
    }
    return user;
  });

  fs.writeFileSync(
    path.join('./src/data', 'users.json'),
    JSON.stringify(newUsers)
  );

  res.status(202).json({
    status: 'success'
  });
};

export default { signup, login, logout, forgotPassword, resetPassword };
