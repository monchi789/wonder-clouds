import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  // Importante: permite a axios enviar y recibir cookies
  withCredentials: true
})

// Interceptor para manejar errores y refresh token
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    // Si el error es 401 y no hemos intentado refresh
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      try {
        // La cookie de refresh token se enviará automáticamente
        await axios.post('tu-api-url/refresh', {}, { withCredentials: true })

        // No necesitamos manejar el token manualmente,
        // la API debe establecer la cookie
        return axiosInstance(originalRequest)
      } catch (error) {
        // Si el refresh falla, redirigir al login
        window.location.href = '/login'
        return Promise.reject(error)
      }
    }

    return Promise.reject(error)
  }
)

export default axiosInstance
