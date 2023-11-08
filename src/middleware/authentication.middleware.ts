import { NextFunction, Request, Response } from "express";

import jwt from "jsonwebtoken";
import { ENV } from "../config";
import { RoleType } from "../types/auth";
import { CommonResponse } from "../types/common/Response";
import prisma from "../libs/prismaClient";


const ACCESS_TOKEN = ENV.ACCESS_TOKEN as string;

const verifyToken =
  (authRole?: RoleType[]) =>
  (
    req: Request<{}, {}, {}, any>,
    res: Response<CommonResponse>,
    next: NextFunction
  ) => {
    const authToken = req.headers["authorization"] as string;

    if (authToken === null) {
      return res.status(401).json({
        data: null,
        error: null,
        status: 401,
        message: "Token is required",
      });
    }

    jwt.verify(authToken, ACCESS_TOKEN, async (err, decode: any) => {
      if (err) {
        return res.status(401).json({
          data: null,
          error: null,
          status: 401,
          message: "Token invalid or expired",
        });
      }
      // @ts-ignore
      req.email = decode.email;

      const user = await prisma.user.findFirst({
        where: {
          email: decode.email,
        },
      });

      if (!authRole) {
        return next();
      }

      if (authRole && authRole.some((record) => record === user?.role)) {
        return next();
      }

      return res.status(401).json({
        data: null,
        error: null,
        status: 401,
        message: "No access on this resource",
      });
    });
  };

export { verifyToken };
