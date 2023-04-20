import express, { NextFunction, Request, Response } from 'express';
import morgan from 'morgan';

import clothesRouter from './routes/clothesRoute';

const app = express();

app.use(morgan('dev'));

app.use(express.json());

// FAKE RESPONSE WAITING
app.use((req: Request, res: Response, next: NextFunction) => {
  setTimeout(() => next(), 1000);
});

app.use('/api/v1/clothes', clothesRouter);

const port = 3000;
app.listen(port, () => {
  console.log(`App is running on port ${port}`);
})