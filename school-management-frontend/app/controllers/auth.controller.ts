import { login, register } from '@/app/services/auth.service';
import { LoginRequest, RegisterRequest } from '@/app/models/auth.model';


export async function loginController(
  data: LoginRequest
) {
  return await login(data);
}

export async function registerController(
  data: RegisterRequest
) {
  return register(data);
}