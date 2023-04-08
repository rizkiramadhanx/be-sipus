import express, { Express, Request, Response, json } from 'express';
import { ErrorMessage } from './utils';

const PORT = 3000;

const app: Express = express();

// Route

app.get('/', (req: Request, res: Response) => {
  res.send('Hello world 🌏');
});

// connect to DB

app.use(json());

app.listen(PORT, () => {
  console.log('listening on PORT on ' + PORT);
});
