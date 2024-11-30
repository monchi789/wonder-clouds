import type React from 'react'
import type { User } from '@/interfaces/User'

interface UserCardProps {
  user: User
  onEdit?: (id: string) => void
  onDelete?: (id: string) => void
}

const UserCard: React.FC<UserCardProps> = ({ user, onEdit, onDelete }) => {
  return (
    <div className='p-4 border rounded-lg shadow-sm bg-white flex flex-col gap-3'>
      <div>
        <h2 className='text-lg font-semibold'>
          {user.nombre} {user.apellidoPaterno} {user.apellidoMaterno}
        </h2>
        <p className='text-sm text-gray-600'>{user.email}</p>
        <p className='text-sm text-gray-500'>Rol: {user.rol}</p>
      </div>

      <div className='flex justify-between items-center'>
        <button
          className='px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600'
          onClick={() => onEdit?.(user.idUsuario)}
        >
          Editar
        </button>
        <button
          className='px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600'
          onClick={() => onDelete?.(user.idUsuario)}
        >
          Eliminar
        </button>
      </div>
    </div>
  )
}

export default UserCard
