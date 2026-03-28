export class Exception extends Error {
  public readonly statusCode: number;
  public readonly error: string;

  constructor(message: string, statusCode: number = 422) {
    super(message);
    this.name = 'Exception';
    this.error = message;
    this.statusCode = statusCode;

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, Exception);
    }
  }
}
