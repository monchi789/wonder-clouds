import axiosInstance from '@/configs/axios';
import { LoginCredentials } from '../types/auth';

// Servicio de autenticación
const authService = {
  // Login con manejo de tokens
  login: async (credentials: LoginCredentials) => {
    try {
      const response = await axiosInstance.post('auth/login', credentials);
      
      if (response.data.accessToken && response.data.refreshToken) {
        // Almacenar tokens
        localStorage.setItem('accessToken', response.data.accessToken);
        localStorage.setItem('refreshToken', response.data.refreshToken);
        
        // Retornar datos de usuario
        return {
          user: response.data.user,
          accessToken: response.data.accessToken,
          refreshToken: response.data.refreshToken
        };
      }
      
      throw new Error('No se recibieron tokens');
    } catch (error) {
      throw error;
    }
  },

  // Refresh token
  refreshToken: async () => {
    const refreshToken = localStorage.getItem('refreshToken');
    
    try {
      const response = await axiosInstance.post('auth/refresh', { refreshToken });
      
      if (response.data.accessToken) {
        localStorage.setItem('accessToken', response.data.accessToken);
        return response.data.accessToken;
      }
      
      throw new Error('No se pudo refrescar el token');
    } catch (error) {
      // Logout si falla el refresh
      authService.logout();
      throw error;
    }
  },

  // Logout
  logout: () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  }
};

export default authService;
