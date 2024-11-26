import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getUserById, updateUser } from '../services/user.api'

const UserEdit = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    usuario: '',
    contrasena: '',
    rol: ''
  })

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await getUserById(id as string)

        setFormData(user)
      } catch (error) {
        console.error('Error al obtener el usuario:', error)
      }
    }

    fetchUser()
  }, [id])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target

    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await updateUser(id as string, formData)
      alert('Usuario actualizado correctamente.')
      navigate('/users')
    } catch (error) {
      console.error('Error al actualizar usuario:', error)
      alert('Error al actualizar el usuario.')
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className='max-w-4xl mx-auto mt-6 p-6 bg-white rounded-lg shadow-lg space-y-6'
    >
      <h1 className='text-2xl font-bold'>Editar Usuario</h1>

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
        <label className='block text-sm font-medium text-gray-700'>Rol</label>
        <select
          name='rol'
          value={formData.rol}
          onChange={handleChange}
          className='block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500'
          required
        >
          <option value='Admin'>Admin</option>
          <option value='Editor'>Editor</option>
          <option value='Viewer'>Viewer</option>
        </select>
      </div>

      <button
        type='submit'
        className='bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600 transition px-4 py-2'
      >
        Guardar Cambios
      </button>
    </form>
  )
}

export default UserEdit
