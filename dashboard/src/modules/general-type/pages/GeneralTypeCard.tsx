import { deleteTipoGeneral } from '../services/general-type.api';
import { GeneralTypeEditModal } from './GeneralTypeEditModal';
import { useState } from 'react';
import { GeneralType } from '@/interfaces/GeneralType';

interface GeneralTypeCardProps {
  type: GeneralType; // Objeto del tipo general
  refresh: () => Promise<void>; // Función para actualizar la lista
}

const GeneralTypeCard = ({ type, refresh }: GeneralTypeCardProps) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Manejar eliminación
  const handleDelete = async () => {
    if (confirm(`¿Estás seguro de eliminar el tipo general "${type.nombre}"?`)) {
      try {
        await deleteTipoGeneral(type.idTipoGeneral);
        alert('Tipo general eliminado correctamente.');
        refresh(); // Refrescar la lista después de eliminar
      } catch (error) {
        console.error('Error al eliminar tipo general:', error);
        alert('No se pudo eliminar el tipo general.');
      }
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4 space-y-4">
      <h3 className="text-lg font-bold">{type.nombre}</h3>
      <p className="text-gray-600">{type.descripcion}</p>
      <div className="flex justify-between">
        <button
          onClick={() => setIsEditModalOpen(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600"
        >
          Editar
        </button>
        <button
          onClick={handleDelete}
          className="bg-red-500 text-white px-4 py-2 rounded shadow hover:bg-red-600"
        >
          Eliminar
        </button>
      </div>

      {/* Modal de edición */}
      {isEditModalOpen && (
        <GeneralTypeEditModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          type={type} // Pasa el objeto completo para editar
          refresh={refresh} // Refresca la lista tras editar
        />
      )}
    </div>
  );
};

export default GeneralTypeCard;
