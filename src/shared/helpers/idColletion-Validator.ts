import { param } from 'express-validator';
import { validateResult } from './validate.helper';
import mongoose from 'mongoose';

export const validateIdCollection = [
  param('id')
    .notEmpty()
    .withMessage('The ID is required.')
    .custom((value) => {
      if (!mongoose.Types.ObjectId.isValid(value)) {
        throw new Error('The ID must be a number');
      }
      return true;
    }),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];
