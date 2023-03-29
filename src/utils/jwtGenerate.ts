import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const ACCESS_TOKEN = process.env.ACCESS_TOKEN || 'cuaks';
const REFRESH_TOKEN = process.env.REFRESH_TOKEN || 'cuaks';

const jwtGenerate = (data: any) => {
  const token = jwt.sign(data, ACCESS_TOKEN, {
    expiresIn: '1h',
  });

  const refresh = jwt.sign(data, REFRESH_TOKEN, {
    expiresIn: '30d',
  });

  return {
    token: token,
    refresh_token: refresh,
  };
};

export default jwtGenerate;
