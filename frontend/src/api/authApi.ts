import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Define los tipos para las solicitudes/respuestas
interface LoginRequest {
  email: string;
  password: string;
}

interface RegisterRequest {
  email: string;
  password: string;
  role?: string; // Opcional, puede ser 'seller' o 'buyer'
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
    baseUrl: `${import.meta.env.VITE_API_URL}/auth`, // Asegúrate de configurar esta variable en .env como VITE_API_URL
  }),
  endpoints: (builder) => ({
    // Endpoint para login
    login: builder.mutation<AuthResponse, LoginRequest>({
      query: (credentials) => ({
        url: '/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    
    // Endpoint para registro
    register: builder.mutation<AuthResponse, RegisterRequest>({
      query: (userData) => ({
        url: '/register',
        method: 'POST',
        body: { ...userData, role: userData.role || 'seller' }, // Default a 'seller'
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
  }),
});

// Exporta los hooks generados automáticamente
export const { 
  useLoginMutation, 
  useRegisterMutation,
  useGetProfileQuery,
} = authApi;