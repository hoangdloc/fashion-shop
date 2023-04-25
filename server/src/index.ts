import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import express, { NextFunction, Request, Response } from 'express';
import morgan from 'morgan';

import globalErrorHandler from './controllers/errorController';
import clothesRouter from './routes/clothesRoute';
import userRouter from './routes/userRoutes';
import AppError from './utils/appError';

dotenv.config({ path: './config.env' });

const app = express();

app.use(morgan('dev'));

app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(cookieParser());

// FAKE RESPONSE WAITING
app.use((req: Request, res: Response, next: NextFunction) => {
  setTimeout(() => next(), 3000);
});

app.use('/api/v1/clothes', clothesRouter);
app.use('/api/v1/users', userRouter);

app.all('*', (req: Request, res: Response, next: NextFunction) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 400));
});

app.use(globalErrorHandler);

const port = 3000;
app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});
