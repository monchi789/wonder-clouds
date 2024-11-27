import { useState, useEffect } from 'react';
import Title from '@/shared/components/common/Title'; // Título reutilizable
import GeneralTypeCard from './GeneralTypeCard'; // Asegúrate de que este archivo esté en "pages"
import CrearTipoGeneralModal from './GeneralTypeCreateModal'; // Modal actualizado
import { getAllTipoGeneral } from '../services/general-type.api';
import { GeneralType } from '@/interfaces/GeneralType';

const GeneralTypeMain = () => {
  const [isModalOpen, setIsModalOpen] = useState(false); // Controla el estado del modal
  const [generalTypes, setGeneralTypes] = useState<GeneralType[]>([]); // Lista de tipos generales
  const [loading, setLoading] = useState(true); // Controla el estado de carga

  // Función para abrir el modal
  const handleOpenModal = () => setIsModalOpen(true);

  // Función para cerrar el modal
  const handleCloseModal = () => setIsModalOpen(false);

  // Función para obtener los tipos generales desde el backend
  const fetchGeneralTypes = async () => {
    setLoading(true); // Muestra el indicador de carga
    try {
      const data = await getAllTipoGeneral(); // Llama al servicio para obtener los datos
      setGeneralTypes(data); // Actualiza la lista de tipos generales
    } catch (error) {
      console.error('Error al obtener tipos generales:', error);
    } finally {
      setLoading(false); // Oculta el indicador de carga
    }
  };

  // Cargar los datos al montar el componente
  useEffect(() => {
    fetchGeneralTypes();
  }, []);

  return (
    <>
      {/* Título principal */}
      <Title
        title="Tipos Generales"
        description="Aquí puedes gestionar todos los tipos generales."
      />

      {/* Botón para abrir el modal de creación */}
      <div className="flex justify-end mt-4">
        <button
          onClick={handleOpenModal}
          className="bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded shadow-md"
        >
          Crear Tipo General
        </button>
      </div>

      {/* Contenedor de las tarjetas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {loading ? (
          <p className="text-center">Cargando tipos generales...</p>
        ) : (
          generalTypes.map((type) => (
            <GeneralTypeCard
              key={type.idTipoGeneral} // Asegúrate de que "idTipoGeneral" es único
              type={type} // Pasa el objeto tipo
              refresh={fetchGeneralTypes} // Refresca la lista tras acciones
            />
          ))
        )}
      </div>

      {/* Modal de creación */}
      <CrearTipoGeneralModal
        open={isModalOpen} // Controla si el modal está abierto
        onClose={handleCloseModal} // Función para cerrar el modal
        refresh={fetchGeneralTypes} // Refresca la lista tras crear un nuevo tipo
      />
    </>
  );
};

export default GeneralTypeMain;
