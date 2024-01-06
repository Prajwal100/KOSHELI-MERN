
import {Request, Response, NextFunction} from 'express';
import {validationResult} from 'express-validator'
export const validate = (
    req: Request,
    res: Response,
    next: NextFunction
  ): void => {
    const errors = validationResult(req);
    // console.log(req, req.body);
    if (errors.isEmpty()) {
      next();
      return;
    }
    const field = errors.array()[0].param;
    const message = errors.array()[0].msg;
    res.status(422).send({
      ok: false,
      code: "validation_error",
      field: field,
      message: message,
    });
  };