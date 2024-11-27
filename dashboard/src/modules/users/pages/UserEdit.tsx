import { useState } from 'react';
import { updateUser } from '../services/user.api';

const UserEdit = ({
  user,
  onClose,
  onSave,
}: {
  user: {
    idUsuario: string;
    usuario: string;
    contrasena: string;
    email: string;
    rol: string;
    nombre: string;
    apellidoPaterno?: string;
    apellidoMaterno?: string;
  };
  onClose: () => void;
  onSave: () => void;
}) => {
  const [formData, setFormData] = useState({
    ...user, // Prellenamos el formulario con los datos del usuario
    contrasena: '', // La contraseña siempre debe ser actualizada (según Swagger)
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Llamamos al service para actualizar el usuario
      await updateUser(user.idUsuario, formData);
      alert('Usuario actualizado correctamente.');
      onSave(); // Refresca la lista de usuarios
      onClose(); // Cierra el modal
    } catch (error) {
      console.error('Error al actualizar usuario:', error);
      alert('Error al actualizar el usuario.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className='space-y-6'>
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
        <label className='block text-sm font-medium text-gray-700'>Correo Electrónico</label>
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
        <label className='block text-sm font-medium text-gray-700'>Rol</label>
        <select
          name='rol'
          value={formData.rol}
          onChange={handleChange}
          className='block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500'
          required
        >
          <option value='ADMIN'>Admin</option>
          <option value='EDITOR'>Editor</option>
          <option value='VIEWER'>Viewer</option>
        </select>
      </div>

      <div>
        <label className='block text-sm font-medium text-gray-700'>Apellido Paterno</label>
        <input
          type='text'
          name='apellidoPaterno'
          value={formData.apellidoPaterno || ''}
          onChange={handleChange}
          className='block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500'
        />
      </div>

      <div>
        <label className='block text-sm font-medium text-gray-700'>Apellido Materno</label>
        <input
          type='text'
          name='apellidoMaterno'
          value={formData.apellidoMaterno || ''}
          onChange={handleChange}
          className='block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500'
        />
      </div>

      <button
        type='submit'
        className='bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600 transition px-4 py-2'
      >
        Guardar Cambios
      </button>
    </form>
  );
};

export default UserEdit;
