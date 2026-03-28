import { NextFunction, Request, Response } from 'express';
import { verifyAccessToken } from '../infraestructure/auth/jwt-service';
import { Exception } from '../helpers/exception-message';
import { JWTPayload } from '../interfaces/jwt';

// Extend Express Request to include user information
declare global {
  namespace Express {
    interface Request {
      user?: JWTPayload;
    }
  }
}

export const requireAdmin = (req: Request, res: Response, next: NextFunction) => {
  try {
    const header = req.headers['authorization'];
    if (!header) throw new Exception('No token provided', 401);

    const token = header.replace(/^Bearer\s+/i, '');
    const payload = verifyAccessToken(token);
    
    if (!payload.isAdmin) {
      throw new Exception('Admin access required', 403);
    }

    // Add user info to request for use in route handlers
    req.user = payload;
    next();
  } catch (error) {
    next(error);
  }
};

export const requireOwnUserOrAdmin = (req: Request, res: Response, next: NextFunction) => {
  try {
    const header = req.headers['authorization'];
    if (!header) throw new Exception('No token provided', 401);

    const token = header.replace(/^Bearer\s+/i, '');
    const payload = verifyAccessToken(token);
    
    // Allow if admin or if it's the user's own data (uuid from token matches requested id)
    if (!payload.isAdmin && payload.uuid !== req.params.id) {
      throw new Exception('Unauthorized access', 403);
    }

    req.user = payload;
    next();
  } catch (error) {
    next(error);
  }
};