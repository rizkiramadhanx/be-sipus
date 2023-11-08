import { NextFunction, Request, Response } from "express";
import { ValidationError, AnyObject } from "yup";

const validate =
  (schema: AnyObject) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validate(
        {
          body: req.body,
          query: req.query,
          params: req.params,
        },
        { abortEarly: false }
      );

      next();
    } catch (error: any) {
      const errorValidation = error as ValidationError;
      res.status(400).json({
        status: 400,
        data: null,
        error: errorValidation.errors,
        message: "Data Not valid",
      });
    }
  };

export  { validate };
