import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import connectionDB from './db/connection';
import User from './models/user.model';

dotenv.config();

const port = process.env.PORT;

const app: Express = express();

// Route

import authRouter from './routes/auth.route';

app.get('/', (req: Request, res: Response) => {
  res.send('Hello world 🌏');
});

// connect to DB
connectionDB();
app.use(express.json());
app.use('/api/v1', authRouter);

app.listen(port, () => {
  console.log('listening on port on ' + port);
});
