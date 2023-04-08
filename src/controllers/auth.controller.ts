import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

import { CommonResponse } from '@/types/common/Response';
import { jwtGenerate } from '@/utils';
import jwt from 'jsonwebtoken';
import { ENV } from '@/config';

const REFRESH_TOKEN = ENV.PORT as string;

const prisma = new PrismaClient();

// Login

const Login = async (req: Request, res: Response<CommonResponse>) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });

    if (!user) {
      return res.status(400).json({
        status: 400,
        message: 'User not found',
        error: null,
        data: null,
      });
    }

    const isValidUser = bcrypt.compareSync(password, user!.password);

    if (!isValidUser) {
      return res.status(400).json({
        message: 'Password incorect',
        data: null,
        error: null,
        status: 400,
      });
    }

    const token = jwtGenerate({ email: user.email });

    return res.status(200).json({
      data: {
        ...token,
      },
      error: null,
      message: 'You have successfully login',
      status: 200,
    });
  } catch (error) {
    return res.status(400).json({
      message: 'Error has found',
      data: null,
      error: error,
      status: 400,
    });
  }
};

// Register

const Register = async (req: Request, res: Response<CommonResponse>) => {
  const { name, email, password } = req.body;

  try {
    const emailIsExist = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });

    if (emailIsExist) {
      return res.status(400).json({
        data: null,
        status: 400,
        message: 'User already exists',
        error: null,
      });
    }

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const user = await prisma.user.create({
      data: {
        email: email,
        name: name,
        password: hashedPassword,
      },
    });

    if (user) {
      return res.status(200).json({
        data: user,
        status: 200,
        message: 'User created successfully',
        error: null,
      });
    }
  } catch (error) {
    return res.status(400).json({
      message: 'Error has found',
      data: null,
      error: error,
      status: 400,
    });
  }
};

// Me
const Me = async (req: Request, res: Response<CommonResponse>) => {
  // @ts-ignore
  const email = req.email;

  const user = await prisma.user.findFirst({
    where: {
      email: email,
    },
  });

  if (!user) {
    return res.status(401).json({
      data: null,
      error: null,
      status: 401,
      message: 'Error authorization',
    });
  }

  return res.status(200).json({
    data: user,
    error: null,
    status: 200,
    message: `Halo ${user.name}`,
  });
};

// Refresh Token

const RefreshToken = (req: Request, res: Response<CommonResponse>) => {
  const tokenForRefresh = req.headers['authorization'] as string;

  try {
    const decode = jwt.verify(tokenForRefresh, 'Rahasia_refresh_token');

    const { email }: any = decode;

    const token = jwtGenerate({ email: email });

    return res.status(200).json({
      data: {
        ...token,
      },
      error: null,
      message: 'Token successfully updated',
      status: 200,
    });
  } catch (error) {
    return res.status(422).json({
      message: 'invalid refresh token',
      data: null,
      error: error,
      status: 422,
    });
  }
};

export { Login, Register, Me, RefreshToken };
