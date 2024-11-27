import React, { useState } from 'react';
import { createTipoGeneral } from '../services/general-type.api'; // Importa tu función API

const CrearTipoGeneralModal = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  const [formValues, setFormValues] = useState({
    codigo: '',
    nombre: '',
    descripcion: '',
    tipo: 'GENERAL',
    activo: true,
  });

  const [error, setError] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      setError('');
      await createTipoGeneral(formValues);
      alert('¡Tipo general creado con éxito!');
      onClose();
    } catch (error) {
      setError('Hubo un error al crear el tipo general. Por favor, inténtalo nuevamente.');
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-md rounded-lg p-6">
        <h2 className="text-lg font-semibold text-gray-700">Crear Nuevo Tipo General</h2>
        <form className="mt-4 space-y-4">
          <div>
            <label htmlFor="codigo" className="block text-sm font-medium text-gray-600">
              Código
            </label>
            <input
              type="text"
              id="codigo"
              name="codigo"
              value={formValues.codigo}
              onChange={handleInputChange}
              className="w-full mt-1 border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
          <div>
            <label htmlFor="nombre" className="block text-sm font-medium text-gray-600">
              Nombre
            </label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={formValues.nombre}
              onChange={handleInputChange}
              className="w-full mt-1 border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
          <div>
            <label htmlFor="descripcion" className="block text-sm font-medium text-gray-600">
              Descripción
            </label>
            <textarea
              id="descripcion"
              name="descripcion"
              value={formValues.descripcion}
              onChange={handleInputChange}
              rows={3}
              className="w-full mt-1 border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
          <div>
            <label htmlFor="tipo" className="block text-sm font-medium text-gray-600">
              Tipo
            </label>
            <input
              type="text"
              id="tipo"
              name="tipo"
              value={formValues.tipo}
              readOnly
              className="w-full mt-1 border-gray-300 rounded-lg shadow-sm bg-gray-100 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700"
            >
              Crear
            </button>
          </div>
          {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default CrearTipoGeneralModal;
