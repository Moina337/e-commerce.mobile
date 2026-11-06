import { apiFetch } from '@/services/api';
import type { AuthResponse, LoginInput, RegisterInput, User } from '@/types/auth';

export async function loginUser(input: LoginInput): Promise<AuthResponse> {
  return apiFetch<AuthResponse>('/auth/login', {
    method: 'POST',
    body: JSON.stringify({
      email: input.email.trim().toLowerCase(),
      password: input.password,
    }),
  });
}

export async function registerUser(input: RegisterInput): Promise<AuthResponse> {
  return apiFetch<AuthResponse>('/auth/register', {
    method: 'POST',
    body: JSON.stringify({
      name: input.name.trim(),
      email: input.email.trim().toLowerCase(),
      password: input.password,
    }),
  });
}

export async function getMe(token: string): Promise<User> {
  return apiFetch<User>('/users/me', { method: 'GET' }, token);
}
