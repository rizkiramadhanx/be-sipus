import { MongooseError } from 'mongoose';

type CommonResponse = {
  status: number;
  message: string;
  error: MongooseError | null | unknown;
  data: any;
};

export { CommonResponse };
