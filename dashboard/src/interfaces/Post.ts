export interface Post {
  id: string,
  titulo: string,
  contenido: string,
  portada: string,
  categoriaPublicacion: string
}

export const defaultPost: Post = {
  id: "",
  titulo: "",
  contenido: "",
  portada: "",
  categoriaPublicacion: ""
} 
