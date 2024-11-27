import { useState, useEffect } from 'react';
import Title from '@/shared/components/common/Title';
import UserCreate from '@/modules/users/pages/UserCreate';
import UserEdit from '@/modules/users/pages/UserEdit';
import { getAllUsers, deleteUser } from '../services/user.api';

// Define la interfaz del usuario basado en Swagger
interface Usuario {
  idUsuario: string;
  usuario: string;
  contrasena: string;
  email: string;
  rol: string;
  nombre: string;
  apellidoPaterno?: string;
  apellidoMaterno?: string;
}

const UsersMain = () => {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [editUser, setEditUser] = useState<Usuario | null>(null);

  // Fetch inicial de usuarios
  useEffect(() => {
    const fetchUsuarios = async () => {
      setLoading(true);
      try {
        const data = await getAllUsers();
        setUsuarios(data);
      } catch (err) {
        console.error('Error al obtener los usuarios:', err);
        setError('Error al obtener los usuarios.');
      } finally {
        setLoading(false);
      }
    };

    fetchUsuarios();
  }, []);

  // Abrir el modal para crear usuario
  const openCreateModal = () => {
    setEditUser(null); // Limpia los datos de edición
    setShowModal(true);
  };

  // Abrir el modal para editar usuario
  const openEditModal = (user: Usuario) => {
    setEditUser(user);
    setShowModal(true);
  };

  // Cerrar el modal
  const closeModal = () => {
    setShowModal(false);
    setEditUser(null);
  };

  // Eliminar un usuario
  const handleDelete = async (idUsuario: string) => {
    if (confirm('¿Estás seguro de que deseas eliminar este usuario?')) {
      try {
        await deleteUser(idUsuario);
        setUsuarios((prev) => prev.filter((user) => user.idUsuario !== idUsuario));
        alert('Usuario eliminado correctamente.');
      } catch (error) {
        console.error('Error al eliminar usuario:', error);
        alert('Error al eliminar el usuario.');
      }
    }
  };

  // Refrescar la lista de usuarios
  const refreshUsers = async () => {
    try {
      const data = await getAllUsers();
      setUsuarios(data);
    } catch (err) {
      console.error('Error al refrescar los usuarios:', err);
    }
  };

  return (
    <div className='p-6'>
      {/* Título */}
      <Title title='Usuarios' description='Administra y gestiona los usuarios de tu aplicación.' />

      {/* Botón Crear Usuario */}
      <div className='flex justify-end mt-4'>
        <button
          onClick={openCreateModal}
          className='bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded shadow-md'
        >
          Crear Usuario
        </button>
      </div>

      {/* Tabla de usuarios */}
      <div className='overflow-x-auto mt-6'>
        {loading && <p className='text-gray-700'>Cargando usuarios...</p>}
        {error && <p className='text-red-500'>{error}</p>}
        {!loading && !error && (
          <div className='shadow-lg rounded-lg overflow-hidden'>
            <table className='table-auto w-full bg-white'>
              {/* Encabezado */}
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
                      <button
                        onClick={() => openEditModal(user)}
                        className='bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600 transition'
                      >
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
            {editUser ? (
              <UserEdit user={editUser} onClose={closeModal} onSave={refreshUsers} />
            ) : (
              <UserCreate onClose={closeModal} onSave={refreshUsers} />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UsersMain;
