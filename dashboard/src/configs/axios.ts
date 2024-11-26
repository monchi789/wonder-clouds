import axios from 'axios';
import Cookies from 'js-cookie';

// Función para obtener el token de acceso
const getAccessToken = () => Cookies.get('accessToken');

// Función para obtener el refresh token
const getRefreshToken = () => Cookies.get('refreshToken');

// Crear instancia de axios
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // Reemplaza con tu URL base
  headers: {
    'Content-Type': 'application/json',
  }
});

// Interceptor de solicitudes
axiosInstance.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor de respuestas para manejar tokens expirados
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Si el error es de autorización y no es un reintento
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Llamar al endpoint de refresh token
        const refreshToken = getRefreshToken();
        if (!refreshToken) {
          throw new Error('No refresh token found');
        }

        const refreshResponse = await axios.post('/api/v1/auth/refresh', {
          refreshToken,
        });

        const { accessToken, refreshToken: newRefreshToken } = refreshResponse.data;

        // Guardar nuevos tokens en cookies
        Cookies.set('accessToken', accessToken, { expires: 1 / 24 }); // 1 hora de expiración
        Cookies.set('refreshToken', newRefreshToken, { expires: 7 }); // 7 días de expiración

        // Actualizar el token en el header de la solicitud original
        originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;

        // Reintentar la solicitud original
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        // Si falla el refresh, hacer logout
        Cookies.remove('accessToken');
        Cookies.remove('refreshToken');
        window.location.href = '/login'; // Redirigir al login
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
