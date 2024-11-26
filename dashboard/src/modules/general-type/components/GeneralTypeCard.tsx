import { GeneralType } from '@/interfaces/GeneralType';
import { Button } from '@/shared/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/shared/components/ui/card';

interface GeneralTypeCardProps {
  generalType: GeneralType;
}

const GeneralTypeCard = ({ generalType }: GeneralTypeCardProps) => {
  return (
    <Card className="w-full max-w-md transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <CardHeader className="flex flex-col space-y-1">
        <CardTitle className="text-xl font-bold tracking-tight">
          {generalType.nombre}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-32 w-full bg-slate-100 rounded-md mb-4 p-4">
          <p className="text-sm text-slate-600">{generalType.descripcion}</p>
        </div>

        {/* Muestra los detalles adicionales */}
        <div className="space-y-2">
          <p className="text-sm text-slate-700">
            <strong>Código:</strong> {generalType.codigo}
          </p>
          <p className="text-sm text-slate-700">
            <strong>Tipo:</strong> {generalType.tipo}
          </p>
          <p className="text-sm text-slate-700">
            <strong>Estado:</strong> {generalType.activo ? 'Activo' : 'Inactivo'}
          </p>
        </div>
        <div className='space-x-3'>        
          <Button className='mt-2'>
          Editar
        </Button>
          <Button className='mt-2'>
            Eliminar
          </Button></div>
      </CardContent>
    </Card>
  );
};

export default GeneralTypeCard;
