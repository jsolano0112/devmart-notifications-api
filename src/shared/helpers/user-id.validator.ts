import { body, param } from 'express-validator';
import { validateResult } from './validate.helper';

export const validateUserIdNumberBody = [
  body('userId')
    .notEmpty()
    .withMessage('The ID is required.')
    .isInt({ gt: 0 })
    .withMessage('The ID must be a positive number.'),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];

export const validateUserIdNumberParameter = [
  param('userId')
    .notEmpty()
    .withMessage('The ID is required.')
    .isInt({ gt: 0 })
    .withMessage('The ID must be a positive number.'),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];
