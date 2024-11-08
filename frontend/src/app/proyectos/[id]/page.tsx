import { Calendar, Tag } from "lucide-react";
import Image from "next/image";

const proyectoId = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <Image className="rounded-xl mx-auto" src={"/static/images/prueba2.png"} alt="Proyecto" width={1200} height={1080} />
      <div className="max-w-5xl mx-auto mt-10">
        {/* Project Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Sitio web del Colegio de Licenciados en Administración de Cusco</h1>
          <div className="flex flex-wrap items-center gap-4 text-gray-600">
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-2" />
              <span>Completado en 2024</span>
            </div>
            <div className="flex items-center">
              <Tag className="w-4 h-4 mr-2" />
              <span>Desarrollo web</span>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 not-prose mb-6">
          {['Diseño responsivo', 'Busqueda avanzada', 'Fácil navegación', 'Múltiples canales de contacto'].map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Project Content */}
        <div className="prose prose-lg max-w-none space-y-5">
          <h2 className="text-2xl font-semibold">Descripción general</h2>
          <p>
            Este proyecto consistió en el desarrollo completo del frontend del sitio web para el Colegio de Licenciados en Administración de Cusco.
            El objetivo fue crear una plataforma accesible y funcional, permitiendo a los usuarios buscar y consultar a los colegiados de manera eficiente.
            Además, se incluyó información institucional, normativas y resoluciones importantes, noticias destacadas, una bolsa de trabajo, un formulario de contacto y
            detalles sobre cómo colegiarse. La solución ofrece una experiencia de usuario rápida y fluida, con un diseño totalmente adaptable a cualquier dispositivo,
            garantizando facilidad de uso y un acceso ágil a toda la información relevante.
          </p>
          <h2 className="text-2xl font-semibold">Resultados</h2>
          <p>
            El sitio web logró mejorar significativamente la experiencia de usuario, permitiendo a los usuarios encontrar colegiados de manera más rápida y eficiente.
            Gracias a la optimización en el rendimiento, la plataforma logró tiempos de carga reducidos, lo que resultó en un 40% más de visitas y una mayor satisfacción de los usuarios.
            Además, el sitio recibió comentarios positivos por su diseño moderno y facilidad de navegación.
          </p>
        </div>
      </div>
    </div>
  )
}

export default proyectoId;