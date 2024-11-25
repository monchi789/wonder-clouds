import type { Post } from '@/interfaces/Post';
import axios from 'axios';
import Cookies from 'js-cookie';

const cargoApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL as string
});

export const getAllTipoPublicacion = async () => {
  const token = Cookies.get('authToken');

  const res = await cargoApi.get('api/v1/tipo-general/categoria-publicacion', {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  });

  return res.data as Post[];
};

export const createPost = async (post: Post) => {
  const token = Cookies.get('authToken');

  await cargoApi.post('api/v1/publicacion', post, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  });
};
