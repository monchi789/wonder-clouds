import GeneralTypeCard from "./GeneralTypeCard"
import LoadingSpinner from "@/shared/components/common/LoadingSpinner";
import { useGetCategorias } from "../hooks/useCategorias";

const GeneralTypeList = () => {
  const { data: generalTypeList, isLoading, isError, error } = useGetCategorias();

  if (isLoading) {
    return <LoadingSpinner size='w-12 h-12' />;
  }

  if (isError) {
    return <div>Error: {error instanceof Error ? error.message : 'Algo salió mal'}</div>;
  }

  return (
    <div className="mt-6">
      {generalTypeList?.length !== 0 ? generalTypeList?.map((generalType, key) => (
        <GeneralTypeCard
          key={key}
          generalType={generalType}
        />
      )) : <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
        No hay tipos generales
      </div>}


    </div>
  )
}

export default GeneralTypeList;
