import { Link } from "react-router-dom";
import { Button } from '@/shared/components/ui/button'; // Importando el componente Button de Shadcn

const PostsTitle = () => {
  return (
    <div className="bg-gradient-to-r from-wonder-blue to-wonder shadow-lg rounded-lg overflow-hidden border-b border-gray-200 px-6 py-4">
      <div className="flex items-center space-x-3">
        {/* Ícono para dar más contexto */}
        <h2 className="text-3xl font-semibold text-white">Publicaciones</h2>
      </div>
      <p className="text-gray-100 text-sm mt-2">Aquí puedes gestionar todas tus publicaciones recientes y administrar su contenido.</p>

      {/* Botón con un estilo bonito usando Shadcn */}
      <Link to="/posts/new">
        <Button className="mt-4 bg-blue-600 text-white hover:bg-blue-700 rounded-md px-6 py-2 transition duration-300 ease-in-out shadow-md">
          Crear Nueva Publicación
        </Button>
      </Link>
    </div>
  );
};

export default PostsTitle;
