import express, { Request, Response } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';

mongoose
  .connect('mongodb://localhost:27017/express-ts')
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => {
    console.error(err);
  });

import AuthRouter from './Routers/AuthRouter';
import UserRouter from './Routers/UserRouter';

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

app.use('/api/auth', AuthRouter);
app.use('/api/users', UserRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
