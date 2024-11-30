export interface Product {
  idProduct: string;
  nombreProducto: string;
  descripcionProducto: string;
  precioProducto: number;
  imagenProducto: string[] | null;
  categoriaProducto: string;
  estadoActivo: boolean;
}

export const defaultProduct: Product = {
  idProduct: '',
  nombreProducto: '',
  descripcionProducto: '',
  precioProducto: 0,
  imagenProducto: null,
  categoriaProducto: '',
  estadoActivo: false
};
