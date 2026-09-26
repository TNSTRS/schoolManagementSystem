import { apiPost } from '@/app/lib/api';
import {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse
} from '@/app/models/auth.model';

export async function login(
  data: LoginRequest
): Promise<LoginResponse> {
  return apiPost<LoginResponse>('/auth/login', data);
}

export async function register(
  data: RegisterRequest
): Promise<RegisterResponse> {
  return apiPost<RegisterResponse>('/auth/register', data);
}