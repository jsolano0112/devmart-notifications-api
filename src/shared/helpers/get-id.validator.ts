import { param } from 'express-validator';
import { validateResult } from './validate.helper';
import mongoose from 'mongoose';
import { Exception } from './exception-message';

export const validateId = [
  param('id')
    .notEmpty()
    .withMessage('The ID is required.')
    .custom((value) => {
      if (!mongoose.Types.ObjectId.isValid(value)) {
        throw new Exception(
          'The ID must be a valid 24-character hex string.',
          422,
        );
      }
      return true;
    }),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];
