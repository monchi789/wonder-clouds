import { GeneralType } from '@/interfaces/GeneralType';
import axios from 'axios';
import Cookies from 'js-cookie';

const cargoApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL
});

export const getAllTipoGeneral = async () => {
  const token = Cookies.get('authToken');

  const res = await cargoApi.get('api/v1/tipo-general', {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  });

  return res.data;
};

export const createTipoGeneral = async (tipoGeneral: GeneralType) => {
  const token = Cookies.get('authToken');

  cargoApi.post('api/v1/tipo-general', tipoGeneral, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  });
};
