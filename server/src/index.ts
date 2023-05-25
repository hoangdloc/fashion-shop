import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express, { NextFunction, Request, Response } from 'express';
import morgan from 'morgan';
import http from 'http';
import { Server, Socket } from 'socket.io';

import globalErrorHandler from './controllers/errorController';
import clothesRouter from './routes/clothesRoute';
import userRouter from './routes/userRoutes';
import AppError from './utils/appError';
import registerOtpHandler from './controllers/otpController';

dotenv.config({ path: './config.env' });

const app = express();

app.use(morgan('dev'));

app.use(cors());

app.options('*', cors());

app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(cookieParser());

// FAKE RESPONSE WAITING
app.use((req: Request, res: Response, next: NextFunction) => {
  setTimeout(() => next(), 1000);
});

app.use('/api/v1/clothes', clothesRouter);
app.use('/api/v1/users', userRouter);

app.all('*', (req: Request, res: Response, next: NextFunction) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 400));
});

app.use(globalErrorHandler);

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL,
    methods: ['GET', 'POST', 'PUT']
  }
});

const onConnection = (socket: Socket) => {
  registerOtpHandler(io, socket);
};

io.on('connection', onConnection);

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});
