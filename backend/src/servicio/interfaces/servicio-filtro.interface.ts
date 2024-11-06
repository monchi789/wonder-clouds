export interface FiltrosServicio {
  nombre?: string;
  precioMinimo?: number;
  precioMaximo?: number;
  ordenPrecio?: 'ASC' | 'DESC';
  fechaCreacionDesde?: Date;
  fechaCreacionHasta?: Date;
}
