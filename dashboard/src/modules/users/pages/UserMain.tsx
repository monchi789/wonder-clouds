import { useState, useEffect } from 'react'
import Title from '@/shared/components/common/Title'
import UserCreate from '@/modules/users/pages/UserCreate'
import { getAllUsers, deleteUser } from '../services/user.api'

// Define la interfaz del usuario
interface Usuario {
  idUsuario: string
  nombre: string
  email: string
  usuario: string
  rol: string
}

const UsersMain = () => {
  const [usuarios, setUsuarios] = useState<Usuario[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showModal, setShowModal] = useState(false) // Estado del modal

  // Fetch inicial de usuarios
  useEffect(() => {
    const fetchUsuarios = async () => {
      setLoading(true)
      try {
        const data = await getAllUsers()

        setUsuarios(data)
      } catch (err) {
        console.error('Error al obtener los usuarios:', err)
        setError('Error al obtener los usuarios.')
      } finally {
        setLoading(false)
      }
    }

    fetchUsuarios()
  }, [])

  const openModal = () => setShowModal(true)
  const closeModal = () => setShowModal(false)

  const handleDelete = async (idUsuario: string) => {
    if (confirm('¿Estás seguro de que deseas eliminar este usuario?')) {
      try {
        await deleteUser(idUsuario)
        setUsuarios((prev) => prev.filter((user) => user.idUsuario !== idUsuario))
        alert('Usuario eliminado correctamente.')
      } catch (error) {
        console.error('Error al eliminar usuario:', error)
        alert('Error al eliminar el usuario.')
      }
    }
  }

  return (
    <>
      {/* Encabezado principal sin cambios */}
      <Title title='Usuarios' description='Administra y gestiona los usuarios de tu aplicación.' />

      {/* Botón Crear Usuario fuera del encabezado */}
      <div className='flex justify-end mt-4'>
        <button
          onClick={openModal}
          className='bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded shadow-md'
        >
          Crear Usuario
        </button>
      </div>

      {/* Tabla */}
      <div className='overflow-x-auto mt-6'>
        {loading && <p className='text-gray-700'>Cargando usuarios...</p>}
        {error && <p className='text-red-500'>{error}</p>}
        {!loading && !error && (
          <div className='shadow-lg rounded-lg overflow-hidden'>
            <table className='table-auto w-full bg-white'>
              {/* Encabezado de la tabla ajustado al gradiente azul */}
              <thead className='bg-gradient-to-r from-blue-500 to-blue-700 text-white'>
                <tr>
                  <th className='px-6 py-3 text-left text-sm font-medium'>Nombre</th>
                  <th className='px-6 py-3 text-left text-sm font-medium'>Email</th>
                  <th className='px-6 py-3 text-left text-sm font-medium'>Usuario</th>
                  <th className='px-6 py-3 text-left text-sm font-medium'>Rol</th>
                  <th className='px-6 py-3 text-center text-sm font-medium'>Acciones</th>
                </tr>
              </thead>
              <tbody className='divide-y divide-gray-200'>
                {usuarios.map((user, index) => (
                  <tr key={user.idUsuario} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                    <td className='px-6 py-3 text-sm font-medium text-gray-900'>{user.nombre}</td>
                    <td className='px-6 py-3 text-sm text-gray-700'>{user.email}</td>
                    <td className='px-6 py-3 text-sm text-gray-700'>{user.usuario}</td>
                    <td className='px-6 py-3 text-sm text-gray-700'>{user.rol}</td>
                    <td className='px-6 py-3 text-center space-x-2'>
                      <button className='bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600 transition'>
                        Editar
                      </button>
                      <button
                        onClick={() => handleDelete(user.idUsuario)}
                        className='bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 transition'
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className='fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50'>
          <div className='bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl relative'>
            <button
              onClick={closeModal}
              className='absolute top-4 right-4 text-gray-600 hover:text-gray-800'
            >
              ✕
            </button>
            <UserCreate onClose={closeModal} />
          </div>
        </div>
      )}
    </>
  )
}

export default UsersMain
