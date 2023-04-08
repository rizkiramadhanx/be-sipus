import express, { Express, Request, Response, json } from 'express';
import { ENV } from '@/config';
import cors from 'cors';

const PORT = ENV.PORT;

const app: Express = express();

import router from './routes/auth.route';

// Route

app.get('/', (req: Request, res: Response) => {
  res.send('Hello world 🌏');
});

// connect to DB

app.use(
  cors({
    origin: '*',
  })
);
app.use(json());
app.use('/api/v1', router);

app.listen(PORT, () => {
  console.log('listening on PORT on ' + PORT);
});
