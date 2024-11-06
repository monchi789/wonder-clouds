export interface FiltrosCliente {
  nombre?: string;
  apellidoPaterno?: string;
  nroDocumento?: string;
  rubro?: string;
  tipoDocumento?: string;
  tipoCliente?: string;
  fechaCreacionDesde?: Date;
  fechaCreacionHasta?: Date;
  ordenFecha?: 'ASC' | 'DESC';
}
