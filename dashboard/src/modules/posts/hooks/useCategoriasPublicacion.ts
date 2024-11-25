// hooks/useCargos.ts
import { useQuery } from '@tanstack/react-query';
import { GeneralType } from '@/interfaces/GeneralType';
import { getAllTipoPublicacion } from '../services/post.api';

export const useGetCategoriasPublicacion = () => {
  return useQuery<GeneralType[], Error>({
    queryKey: ['tipoPublicacion'],
    queryFn: getAllTipoPublicacion
  });
};
