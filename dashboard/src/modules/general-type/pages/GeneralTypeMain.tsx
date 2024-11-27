import Title from '@/shared/components/common/Title';
import GeneralTypeList from '../components/GeneralTypeList';
import { useState } from 'react';
import { GeneralTypeCreateModal } from '../components/GeneralTypeCreateModal';


const GeneralTypeMain = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <>
      <Title
        title="Tipos Generales"
        description="Aquí puedes gestionar todos los tipos generales."
        buttonName='Crear Tipo General'
        openModal={() => handleOpenModal}
      />

      <GeneralTypeList />

      {isModalOpen && <GeneralTypeCreateModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />}
    </>
  );
};

export default GeneralTypeMain;
