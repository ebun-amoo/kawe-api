import { UserRole } from "../generated/prisma/enums";

export type BaseResponse<T> =
| {
    success: true;
    data: T;
    message: string;
  }
| {
    success: false;
    data: null;
    message: string;
  };

export interface ValidationError {
  field: string;
  message: string;
}

export interface RegisterUserInput {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface RegisterUserResponse {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface LoginUserInput {
  email: string;
  password: string;
}

export type LoginUserResponse = RegisterUserResponse & {
  accessToken: string;
  role: UserRole;
}
export type LoginServiceResult = {
  response: BaseResponse<LoginUserResponse>;
  refreshToken: string | null;
};