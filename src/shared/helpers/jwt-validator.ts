import { NextFunction, Request, Response } from 'express';
import { verifyAccessToken } from '../infraestructure/auth/jwt-service';
import { Exception } from '../helpers/exception-message';

export const verifyAuthToken = (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  try {
    const header = request.headers['authorization'];
    if (!header) throw new Exception('No token provided', 401);

    const token = header.replace(/^Bearer\s+/i, '');
    verifyAccessToken(token);

    next();
  } catch (error) {
    next(error);
  }
};
