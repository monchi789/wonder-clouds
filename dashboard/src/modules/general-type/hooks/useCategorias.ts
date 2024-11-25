import { GeneralType } from "@/interfaces/GeneralType";
import { getAllTipoGeneral } from "../services/general-type.api";
import { useQuery } from "@tanstack/react-query";

export const useGetCategorias = () => { 
  return useQuery<GeneralType[], Error>({
    queryKey: ['tipoGeneral'],
    queryFn: getAllTipoGeneral
  });
}
