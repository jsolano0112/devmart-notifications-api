export interface IUserResponse {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  mobilePhone: string;
  city: string;
  zipCode: number;
  lockUntil?: Date | null;
  failedLoginAttempts: number;
}

export interface IUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  mobilePhone: string;
  city: string;
  zipCode: number;
  isActive: boolean;
  password: string;
  isAdmin: boolean;
  lockUntil?: Date | null;
  failedLoginAttempts: number;
}

export interface IUpdateUser {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  mobilePhone: string;
  city: string;
  zipCode: number;
  isActive: boolean;
  password: string;
  isAdmin: boolean;
  lockUntil?: Date;
  failedLoginAttempts: number;
}

export interface IUserCredentials {
  email: string;
  password: string;
}

export interface IUserCredentialsResponse {
  email: string;
  id: number;
  firstname: string;
  lastname: string;
  isAdmin: boolean;
  accessToken: string;
  refreshToken: string;
}


export interface IUserParams {
  id: number;
}