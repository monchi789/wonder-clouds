export interface FiltrosTrabajo {
  nombre?: string;
  visibilidadTrabajo?: boolean;
  fechaTrabajoDesde?: Date;
  fechaTrabajoHasta?: Date;
  tipoTrabajo?: string;
  ordenFecha?: 'ASC' | 'DESC';
}
