import axiosInstance from '@/configs/axios';
import { GeneralType } from '@/interfaces/GeneralType'; // Se usa para la estructura en el update

// Crear un nuevo tipo general
export const createTipoGeneral = async (tipoGeneral: {
  codigo: string;
  nombre: string;
  descripcion: string;
  tipo: string;
  activo: boolean;
}): Promise<GeneralType> => {
  try {
    const res = await axiosInstance.post('tipo-general', tipoGeneral, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return res.data;
  } catch (error: any) {
    console.error('Error al crear el tipo general:', error.response?.data || error.message);
    throw error;
  }
};

// Obtener todos los tipos generales
export const getAllTipoGeneral = async (): Promise<GeneralType[]> => {
  try {
    const res = await axiosInstance.get('tipo-general'); // Sin headers adicionales
    return res.data;
  } catch (error: any) {
    console.error('Error al obtener los tipos generales:', error.response?.data || error.message);
    throw error;
  }
};

// Actualizar un tipo general por ID
export const updateTipoGeneral = async (
  id: string,
  tipoGeneral: Partial<GeneralType>, // Usa la estructura definida en la interfaz
): Promise<GeneralType> => {
  try {
    const res = await axiosInstance.patch(`tipo-general/${id}`, tipoGeneral, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return res.data;
  } catch (error: any) {
    console.error('Error al actualizar el tipo general:', error.response?.data || error.message);
    throw error;
  }
};

// Eliminar un tipo general por ID
export const deleteTipoGeneral = async (id: string): Promise<void> => {
  try {
    await axiosInstance.delete(`tipo-general/${id}`); // Sin headers adicionales
  } catch (error: any) {
    console.error('Error al eliminar el tipo general:', error.response?.data || error.message);
    throw error;
  }
};
