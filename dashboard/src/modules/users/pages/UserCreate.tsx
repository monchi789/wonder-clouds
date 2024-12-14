import { useState } from 'react'
import { Save } from 'lucide-react'
import { createUser } from '../services/user.api'

interface UserCreateProps {
  onClose: () => void // Función para cerrar el modal
}

const UserCreate = ({ onClose }: UserCreateProps) => {
  const [formData, setFormData] = useState({
    usuario: '',
    contrasena: '',
    email: '',
    nombre: '',
    apellidoPaterno: '',
    apellidoMaterno: ''
  })

  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMessage(null)

    const { usuario, contrasena, email, nombre } = formData

    if (!usuario || !contrasena || !email || !nombre) {
      setErrorMessage('Todos los campos obligatorios deben ser completados.')

      return
    }

    try {
      await createUser(formData)
      setStatus('success')
      setTimeout(onClose, 2000) // Cierra el modal tras éxito
    } catch (error) {
      console.error('Error al crear el usuario:', error)
      setErrorMessage('Error al crear el usuario. Verifica los datos e inténtalo nuevamente.')
      setStatus('error')
    }
  }

  return (
    <form onSubmit={handleSubmit} className='space-y-6'>
      <h2 className='text-2xl font-bold'>Crear Usuario</h2>

      {status === 'success' && <p className='text-green-500'>Usuario creado con éxito.</p>}
      {errorMessage && <p className='text-red-500'>{errorMessage}</p>}

      <div>
        <label className='block text-sm font-medium text-gray-700'>Usuario</label>
        <input
          type='text'
          name='usuario'
          value={formData.usuario}
          onChange={handleChange}
          className='block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500'
          required
        />
      </div>

      <div>
        <label className='block text-sm font-medium text-gray-700'>Contraseña</label>
        <input
          type='password'
          name='contrasena'
          value={formData.contrasena}
          onChange={handleChange}
          className='block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500'
          required
        />
      </div>

      <div>
        <label className='block text-sm font-medium text-gray-700'>Email</label>
        <input
          type='email'
          name='email'
          value={formData.email}
          onChange={handleChange}
          className='block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500'
          required
        />
      </div>

      <div>
        <label className='block text-sm font-medium text-gray-700'>Nombre</label>
        <input
          type='text'
          name='nombre'
          value={formData.nombre}
          onChange={handleChange}
          className='block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500'
          required
        />
      </div>

      <div>
        <label className='block text-sm font-medium text-gray-700'>Apellido Paterno</label>
        <input
          type='text'
          name='apellidoPaterno'
          value={formData.apellidoPaterno}
          onChange={handleChange}
          className='block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500'
        />
      </div>

      <div>
        <label className='block text-sm font-medium text-gray-700'>Apellido Materno</label>
        <input
          type='text'
          name='apellidoMaterno'
          value={formData.apellidoMaterno}
          onChange={handleChange}
          className='block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500'
        />
      </div>

      <div className='flex justify-end'>
        <button
          type='button'
          onClick={onClose}
          className='bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition mr-2'
        >
          Cancelar
        </button>
        <button
          type='submit'
          className='bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition'
        >
          <Save className='w-4 h-4 inline-block mr-1' />
          Guardar
        </button>
      </div>
    </form>
  )
}

export default UserCreate
