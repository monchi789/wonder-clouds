import axiosInstance from '@/configs/axios'
import type { User } from '@/interfaces/User'

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
    const res = await axiosInstance.post('/api/v1/auth/register', user, {
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

  const res = await axiosInstance.get('usuario')

  return res.data
}

// Obtener un usuario por ID
export const getUserById = async (id: string): Promise<User> => {

  const res = await axiosInstance.get(`usuario/${id}`)

  return res.data
}

export const updateUser = async (id: string, user: Partial<User>): Promise<User> => {
  
  const res = await axiosInstance.patch(`usuario/${id}`, user)

  return res.data
}

// Eliminar un usuario
export const deleteUser = async (id: string): Promise<void> => {

    await axiosInstance.delete(`usuario/${id}`)
}

// Cambiar contraseña del usuario
export const changePassword = async (
  id: string,
  data: { email: string; contrasena: string; nuevaContrasena: string }
): Promise<void> => {
    await axiosInstance.patch(`/auth/password/${id}`, data)

}

// Obtener perfil del usuario actual
export const getProfile = async (): Promise<User> => {

    const res = await axiosInstance.get('/auth/profile')

    return res.data
}
