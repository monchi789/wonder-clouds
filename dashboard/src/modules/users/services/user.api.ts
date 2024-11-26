import axios from 'axios'
import Cookies from 'js-cookie'
import type { User } from '@/interfaces/User'

// Instancia de Axios
const userApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL // Reemplaza con tu URL base
})

// Función auxiliar para obtener el token de autenticación
const getAuthToken = () => {
  const token = Cookies.get('authToken')

  if (!token) {
    throw new Error('No se encontró un token de autenticación.')
  }

  return token
}

// Crear un nuevo usuario
export const createUser = async (user: {
  usuario: string
  contrasena: string
  email: string
  nombre: string
  apellidoPaterno?: string
  apellidoMaterno?: string
}): Promise<User> => {
  try {
    const res = await userApi.post('/api/v1/auth/register', user, {
      headers: {
        'Content-Type': 'application/json'
      }
    })

    return res.data
  } catch (error) {
    console.error('Error al crear el usuario:', error)
    throw error
  }
}

// Obtener todos los usuarios
export const getAllUsers = async (): Promise<User[]> => {
  try {
    const token = getAuthToken()

    const res = await userApi.get('/api/v1/usuario', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    return res.data
  } catch (error) {
    console.error('Error al obtener los usuarios:', error)
    throw error
  }
}

// Obtener un usuario por ID
export const getUserById = async (id: string): Promise<User> => {
  try {
    const token = getAuthToken()

    const res = await userApi.get(`/api/v1/usuario/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    return res.data
  } catch (error) {
    console.error(`Error al obtener el usuario con ID ${id}:`, error)
    throw error
  }
}

// Actualizar un usuario
export const updateUser = async (id: string, user: Partial<User>): Promise<User> => {
  try {
    const token = getAuthToken()

    const res = await userApi.patch(`/api/v1/usuario/${id}`, user, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    })

    return res.data
  } catch (error) {
    console.error(`Error al actualizar el usuario con ID ${id}:`, error)
    throw error
  }
}

// Eliminar un usuario
export const deleteUser = async (id: string): Promise<void> => {
  try {
    const token = getAuthToken()

    await userApi.delete(`/api/v1/usuario/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  } catch (error) {
    console.error(`Error al eliminar el usuario con ID ${id}:`, error)
    throw error
  }
}

// Cambiar contraseña del usuario
export const changePassword = async (
  id: string,
  data: { email: string; contrasena: string; nuevaContrasena: string }
): Promise<void> => {
  try {
    const token = getAuthToken()

    await userApi.patch(`/auth/password/${id}`, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    })
  } catch (error) {
    console.error(`Error al cambiar la contraseña del usuario con ID ${id}:`, error)
    throw error
  }
}

// Refrescar el token
export const refreshToken = async (
  refreshToken: string
): Promise<{ accessToken: string; refreshToken: string }> => {
  try {
    const res = await userApi.post(
      '/auth/refresh',
      { refreshToken },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )

    return res.data
  } catch (error) {
    console.error('Error al refrescar el token:', error)
    throw error
  }
}

// Obtener perfil del usuario actual
export const getProfile = async (): Promise<User> => {
  try {
    const token = getAuthToken()

    const res = await userApi.get('/auth/profile', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    return res.data
  } catch (error) {
    console.error('Error al obtener el perfil del usuario:', error)
    throw error
  }
}
