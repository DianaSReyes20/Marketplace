import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Define los tipos para las solicitudes/respuestas
interface LoginRequest {
  email: string;
  password: string;
}

interface RegisterRequest {
  email: string;
  password: string;
  role?: string;
}

interface AuthResponse {
  user: {
    id: number;
    email: string;
    role: string;
  };
  token: string;
}

// Crea la API de autenticación
export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: import.meta.env.REACT_APP_API_URL || 'http://localhost:3000/',
  }),
  endpoints: (builder) => ({
    // Endpoint para login
    login: builder.mutation<AuthResponse, LoginRequest>({
      query: (credentials) => ({
        url: 'auth/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    
    // Endpoint para registro
    register: builder.mutation<AuthResponse, RegisterRequest>({
      query: (userData) => ({
        url: 'auth/register',
        method: 'POST',
        body: { ...userData, role: userData.role || 'seller' },
      }),
    }),
    
    // Endpoint para obtener el perfil del usuario
    getProfile: builder.query<AuthResponse['user'], void>({
      query: () => ({
        url: '/profile',
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`, // O tu método de almacenamiento
        },
      }),
    }),
    getAllSellers: builder.query<AuthResponse['user'][], void>({
      query: () => 'users',
    }),
  }),
});

// Exporta los hooks generados automáticamente
export const { 
  useLoginMutation, 
  useRegisterMutation,
  useGetProfileQuery,
  useGetAllSellersQuery,
} = authApi;