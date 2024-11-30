export enum Type {
  CATEGORIA_SERVICIO = 'CATEGORIA_SERVICIO',
  CATEGORIA_PUBLICACION = 'CATEGORIA_PUBLICACION',
  TIPO_TRABAJO = 'TIPO_TRABAJO',
  GENERAL = 'GENERAL',
  TIPO_DOCUMENTO = 'TIPO_DOCUMENTO',
  TIPO_CLIENTE = 'TIPO_CLIENTE',
}

export interface GeneralType {
  idTipoGeneral: string;
  codigo: string;
  nombre: string;
  descripcion: string;
  tipo: Type;
  activo: boolean;
}
