import { Button } from '@/shared/components/ui/button';
import { Checkbox } from '@/shared/components/ui/checkbox';
import { Input } from '@/shared/components/ui/input';
import { Label } from '@/shared/components/ui/label';
import { Modal } from '@/shared/components/ui/modal';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/components/ui/select';
import React, { useState } from 'react'


enum Type {
  GENERAL = 'GENERAL',
  SPECIFIC = 'SPECIFIC',
  OTHER = 'OTHER'
}

interface GeneralType {
  idTipoGeneral: string;
  codigo: string;
  nombre: string;
  descripcion: string;
  tipo: Type;
  activo: boolean;
}

interface GeneralTypeCreateModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function GeneralTypeCreateModal({ isOpen, onClose }: GeneralTypeCreateModalProps) {
  const [formData, setFormData] = useState<GeneralType>({
    idTipoGeneral: '',
    codigo: '',
    nombre: '',
    descripcion: '',
    tipo: Type.GENERAL,
    activo: true,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleTipoChange = (value: string) => {
    setFormData(prev => ({ ...prev, tipo: value as Type }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Formulario de Tipo General">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="idTipoGeneral">ID Tipo General</Label>
          <Input
            id="idTipoGeneral"
            name="idTipoGeneral"
            value={formData.idTipoGeneral}
            onChange={handleChange}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="codigo">Código</Label>
          <Input
            id="codigo"
            name="codigo"
            value={formData.codigo}
            onChange={handleChange}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="nombre">Nombre</Label>
          <Input
            id="nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="descripcion">Descripción</Label>
          <Input
            id="descripcion"
            name="descripcion"
            value={formData.descripcion}
            onChange={handleChange}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="tipo">Tipo</Label>
          <Select onValueChange={handleTipoChange} value={formData.tipo}>
            <SelectTrigger>
              <SelectValue placeholder="Selecciona un tipo" />
            </SelectTrigger>
            <SelectContent>
              {Object.values(Type).map((tipo) => (
                <SelectItem key={tipo} value={tipo}>
                  {tipo}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="activo"
            checked={formData.activo}
            onCheckedChange={(checked: boolean) => setFormData(prev => ({ ...prev, activo: checked as boolean }))}
          />
          <Label htmlFor="activo">Activo</Label>
        </div>

        <div className="flex justify-between">
          <Button type="submit">Enviar</Button>
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
        </div>
      </form>
    </Modal>
  )
}

