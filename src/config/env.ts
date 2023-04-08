import dotenv from 'dotenv';

dotenv.config();

const ENV = {
  PORT: process.env.PORT,
  ACCESS_TOKEN: process.env.ACCESS_TOKEN,
  REFRESH_TOKEN: process.env.REFRESH_TOKEN,
};

export default ENV;
