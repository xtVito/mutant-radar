import { Request, Response, NextFunction } from "express";
import httpStatus from "http-status";
import { Schema } from "joi";

export const DTOValidator = (schema: Schema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const { error, value } = schema.validate(req.body);
      if (error === undefined || typeof error === "undefined") return next();

      const JoiError = {
        status: httpStatus.BAD_REQUEST,
        error: {
          details: error.details.map(({ message, type }) => ({
            message: message.replace(/['"]/g, '')
          }))
        }
      };

      res.status(httpStatus.BAD_REQUEST).json(JoiError);
    } catch (e) {
      next(e);
    }
  }
}