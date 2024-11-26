export interface Post {
  id: string;
  titulo: string;
  contenido: string;
  portada: string[] | null;
  categoriaPublicacion: string;
}

export const defaultPost: Post = {
  id: '',
  titulo: '',
  contenido: '',
  portada: null,
  categoriaPublicacion: ''
};
