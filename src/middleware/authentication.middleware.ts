import { NextFunction, Request, Response } from 'express';
import { CommonResponse } from '@/types/common/Response';

import jwt from 'jsonwebtoken';
import { ENV } from '@/config';

const ACCESS_TOKEN = ENV.ACCESS_TOKEN as string;

const verifyToken = (
  req: Request,
  res: Response<CommonResponse>,
  next: NextFunction
) => {
  const authToken = req.headers['authorization'] as string;

  if (authToken === null) {
    return res.status(401).json({
      data: null,
      error: null,
      status: 401,
      message: 'Token is required',
    });
  }

  jwt.verify(authToken, ACCESS_TOKEN, (err, decode: any) => {
    if (err) {
      return res.status(401).json({
        data: null,
        error: null,
        status: 401,
        message: 'Token invalid or expired',
      });
    }
    // @ts-ignore
    req.email = decode.email;
    next();
  });
};

export { verifyToken };
