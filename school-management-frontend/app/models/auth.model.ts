export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
}

export interface RegisterRequest {
  username: string;
  password: string;
  fullName: string;
}

export interface RegisterResponse {
  message: string;
}