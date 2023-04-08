// import jwt from 'jsonwebtoken';
// import dotenv from 'dotenv';
// import ENV from '../config/env';

// const ACCESS_TOKEN = ENV.ACCESS_TOKEN as string;
// const REFRESH_TOKEN = ENV.REFRESH_TOKEN as string;

// const jwtGenerate = (data: any) => {
//   const token = jwt.sign(data, ACCESS_TOKEN, {
//     expiresIn: '1h',
//   });

//   const refresh = jwt.sign(data, REFRESH_TOKEN, {
//     expiresIn: '30d',
//   });

//   return {
//     token: token,
//     refresh_token: refresh,
//   };
// };

// export default jwtGenerate;
