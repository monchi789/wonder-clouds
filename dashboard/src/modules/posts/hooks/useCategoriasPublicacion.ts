// Hook: useCargos.ts
import { useQuery } from '@tanstack/react-query';
import { TipoGeneral } from '@/interfaces/TipoGeneral';
import { getAllTipoPublicacion } from '../services/post.api';

export const useGetCategoriasPublicacion = () => {
  return useQuery<TipoGeneral[], Error>({
    queryKey: ['tipoPublicacion'],
    queryFn: getAllTipoPublicacion
  });
};
