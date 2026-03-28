export interface JWTPayload {
  email: string;
  isAdmin: boolean;
  uuid: string;
  exp?: number;
  iat?: number;
}

export interface ITokens {
  accessToken: string;
  refreshToken: string;
}
