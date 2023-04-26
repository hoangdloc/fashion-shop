import { NextFunction, Request, Response } from 'express';
import fs from 'fs';
import jwt from 'jsonwebtoken';
import path from 'path';

import { User, UserRole } from '../@types/user';
import AppError from './../utils/appError';

const users: User[] = JSON.parse(
  fs.readFileSync(path.join('./src/data', 'users.json')).toString()
);

const signToken = (id: number): string =>
  jwt.sign({ id: id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });

type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;

const createSendToken = (
  user: User,
  statusCode: number,
  req: Request,
  res: Response
): void => {
  const token = signToken(user.id);

  res.cookie('jwt', token, {
    expires: new Date(
      Date.now() + +process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    secure: req.secure || req.get('x-forwarded-proto') === 'https',
    httpOnly: true
  });

  const infoUser: Optional<User, 'password'> = Object.assign({}, user);
  infoUser.password = undefined;

  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      infoUser
    }
  });
};

const signup = (req: Request, res: Response): void => {
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

  console.log(user, '|||||||', password);

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

export default { signup, login, logout };
