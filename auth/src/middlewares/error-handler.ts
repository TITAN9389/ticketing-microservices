import { Request, Response, NextFunction } from "express";
import { DbConnectionError } from "../errors/db-connection.error";
import { RequestValidationError } from "../errors/request-validation-error";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof RequestValidationError) {
    return res.status(err.statusCode).send({ errors: err.serializeErrors() });
  }

  if (err instanceof DbConnectionError) {
    return res.status(err.statusCode).send({ errors: err.serializeErrors() });
  }

  res
    .status(400)
    .send({ errors: [{ message: "Oops something went wrong !" }] });
};
