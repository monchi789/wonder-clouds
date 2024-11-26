import api from '@/configs/axios';
import { GeneralType } from '@/interfaces/GeneralType';
import Cookies from 'js-cookie';

export const getAllTipoGeneral = async () => {
  const token = Cookies.get('authToken');

  const res = await api.get('api/v1/tipo-general', {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  });

  return res.data;
};

export const createTipoGeneral = async (tipoGeneral: GeneralType) => {
  const token = Cookies.get('authToken');

  api.post('api/v1/tipo-general', tipoGeneral, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  });
};
