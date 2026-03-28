import jwt from 'jsonwebtoken';
import 'dotenv/config';
import { Exception } from '../../helpers/exception-message';
import { ITokens, JWTPayload } from '../../interfaces/jwt';

//TODO: REVIEW LATER, SAVE TOKEN IN COOKIES IN THE FRONTEND

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRE_IN = process.env.JWT_EXPIRE_IN;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;
const JWT_REFRESH_EXPIRE_IN = process.env.JWT_REFRESH_EXPIRE_IN;

export const generateToken = (payload: JWTPayload): ITokens => {
  try {
    const { exp, iat, ...cleanPayload } = payload;

    const accessToken = jwt.sign(cleanPayload, JWT_SECRET!, {
      algorithm: 'HS256',
      expiresIn: JWT_EXPIRE_IN,
    });

    const refreshToken = jwt.sign(cleanPayload, JWT_REFRESH_SECRET!, {
      algorithm: 'HS256',
      expiresIn: JWT_REFRESH_EXPIRE_IN,
    });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new Exception('By generate token has ocurred error: ' + error, 401);
  }
};

export const verifyAccessToken = (token: string): JWTPayload => {
  try {
    return jwt.verify(token, JWT_SECRET, {
      algorithms: ['HS256'],
    }) as JWTPayload;
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      throw new Exception('Token expired.', 401);
    } else if (error instanceof jwt.JsonWebTokenError) {
      throw new Exception('Invalid Token.', 401);
    } else {
      throw new Exception('By verify token has ocurred error: ' + error, 401);
    }
  }
};
export const verifyRefreshToken = (token: string): JWTPayload => {
  try {
    return jwt.verify(token, JWT_REFRESH_SECRET, {
      algorithms: ['HS256'],
    }) as JWTPayload;
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      throw new Exception('Token expired.', 401);
    } else if (error instanceof jwt.JsonWebTokenError) {
      throw new Exception('Invalid Token.', 401);
    } else {
      throw new Exception('By verify token has ocurred error: ' + error, 401);
    }
  }
};
