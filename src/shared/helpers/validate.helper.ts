import { validationResult } from 'express-validator';

export const validateResult = (req, res, next) => {
  const errors = validationResult(req).array({ onlyFirstError: true });
  if (errors.length > 0) {
    return res.status(422).json({ errors });
  }
  next();
};
