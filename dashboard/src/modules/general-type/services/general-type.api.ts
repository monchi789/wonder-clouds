import axiosInstance from '@/configs/axios';
import { GeneralType } from '@/interfaces/GeneralType';

export const getAllTipoGeneral = async () => {

  const res = await axiosInstance.get('tipo-general');

  return res.data;
};

export const createTipoGeneral = async (tipoGeneral: GeneralType) => {

  axiosInstance.post('tipo-general', tipoGeneral);
};
