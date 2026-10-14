export interface User {
  _id: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export interface SigninResponse {
  success: boolean;
  message: string;
  data: {
    token: string;
    user: User;
  };
}

export interface SelfResponse {
  success: boolean;
  message: string;
  data: User;
}

export interface ApiErrorResponse {
  success?: boolean;
  message?: string;
  error?: string;
}
