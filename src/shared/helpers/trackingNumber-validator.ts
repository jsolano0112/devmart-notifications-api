import { param } from 'express-validator';
import { validateResult } from './validate.helper';
import mongoose from 'mongoose';

export const validateTrackingNumber = [
  param('trackingNumber')
    .notEmpty()
    .withMessage('The tracking ID is required.')
    .matches(/^TRK-\d{8}-\d{5}$/)
    .withMessage(
      'The tracking ID must follow the format TRK-YYYYMMDD-XXXXX (e.g. TRK-20251009-12345).',
    ),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];
