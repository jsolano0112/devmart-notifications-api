import { body } from 'express-validator';
import { validateResult } from '../../../shared/helpers/validate.helper';

export const validateCreateNotification = [
  body('type')
    .notEmpty()
    .withMessage('The type is required.')
    .isString()
    .withMessage('The type must be a string.'),

  body('message')
    .notEmpty()
    .withMessage('The message is required.')
    .isString()
    .withMessage('The message must be a string.'),

  body('userId').notEmpty().withMessage('The userId is required.'),
  body('createdAt')
    .optional({ nullable: true })
    .isISO8601()
    .withMessage('The createdAt must be a valid date.'),

  (req, res, next) => {
    validateResult(req, res, next);
  },
];
