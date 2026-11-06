export type Role = 'ADMIN' | 'CLIENT';

export type AuthStatus = 'loading' | 'signedOut' | 'signedIn';

export type User = {
  id: number;
  name: string;
  email: string;
  role: Role;
  enabled: boolean;
};

export type AuthResponse = {
  accessToken: string;
  tokenType: string;
  expiresIn: number;
};

export type LoginInput = {
  email: string;
  password: string;
};

export type RegisterInput = {
  name: string;
  email: string;
  password: string;
};
