import { Exception } from './exception-message';

export function errorHandler(err, req, res, next) {
  if (err instanceof Exception) {
    return res.status(err.statusCode).json({
      statusCode: err.statusCode,
      error: err.error,
    });
  }

  return res.status(500).json({
    statusCode: 500,
    error: 'Something went wrong on the server.',
  });
}
