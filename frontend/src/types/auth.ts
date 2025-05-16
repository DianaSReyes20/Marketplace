export interface User {
  id: number;
  email: string;
  role: 'admin' | 'seller' | 'buyer';
  createdAt?: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData extends LoginCredentials {
  role?: User['role'];
}

export type AuthState = {
  user: User | null;
  token: string | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
};