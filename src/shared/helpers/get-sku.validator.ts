import { param } from 'express-validator';
import { validateResult } from './validate.helper';
import mongoose from 'mongoose';

export const validateSku = [
  param('sku')
    .notEmpty()
    .withMessage('The SKU is required.')
    .custom((value) => {
      if (!mongoose.Types.ObjectId.isValid(value)) {
        throw new Error('The SKU must be between 8 and 20 characters.');
      }
      return true;
    }),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];
