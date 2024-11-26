import api from '@/configs/axios';
import type { Post } from '@/interfaces/Post';
import Cookies from 'js-cookie';

export const getAllTipoPublicacion = async () => {
  const token = Cookies.get('authToken');

  const res = await api.get('api/v1/tipo-general/categoria-publicacion', {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  });

  return res.data;
};

export const createPost = async (post: Post) => {
  const token = Cookies.get('authToken');

  await api.post('api/v1/publicacion', post, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  });
};
