import { Request, Response } from 'express';
import { MongooseError } from 'mongoose';
import { User } from '../models';
import { TLogin } from '../types/controller.types';
import { CommonResponse } from '../utils/Response';

import bcrypt from 'bcrypt';
import jwtGenerate from '../utils/jwtGenerate';

// Login

const Login = async (
  req: Request<{}, {}, TLogin>,
  res: Response<CommonResponse>
) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(404).json({
        status: 404,
        message: 'User not found',
        error: null,
        data: null,
      });
    }
    let validPassword = bcrypt.compareSync(password, user!.password);

    if (!validPassword) {
      return res.status(401).json({
        message: 'Password incorect',
        data: null,
        error: null,
        status: 401,
      });
    }

    const token = jwtGenerate({ user: user?.username });

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
      message: 'Error: ' + error,
      data: null,
      error: error,
      status: 400,
    });
  }
};

// Register

const Register = async (req: Request, res: Response<CommonResponse>) => {
  const { username, email, password } = req.body;

  try {
    const isUsernameExist = await User.findOne({ username: username });

    if (isUsernameExist) {
      return res.status(400).json({
        message: 'Username already exists',
        data: null,
        error: null,
        status: 400,
      });
    }

    const isEmailExist = await User.findOne({ email: email });

    if (isEmailExist) {
      return res.status(400).json({
        message: 'Email already exists',
        data: null,
        error: null,
        status: 400,
      });
    }

    const user = await User.create({
      username: username,
      email: email,
      password: password,
    });

    if (user) {
      return res.status(201).json({
        status: 201,
        message: 'Register successfully',
        error: null,
        data: {
          username: user.username,
          email: user.email,
        },
      });
    }
  } catch (error) {
    return res.status(400).json({
      message: 'Error: ' + error,
      data: null,
      error: error,
      status: 400,
    });
  }
};

// Me

// Refresh Token

export { Login, Register };
