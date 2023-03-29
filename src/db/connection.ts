import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const DB_URL: string = process.env.DB_URL || 'mongodb://127.0.0.1:27017/myapp';

const connectionDB = async () => {
  try {
    const conn = await mongoose.connect(DB_URL);

    if (conn) {
      console.log('Connected to DB');
    }
  } catch (error) {
    console.log(error);
  }
};

export default connectionDB;
