import CardProject from "@/components/ui/ProjectCard"

const ProjectsList = () => {
  return (
    <div className="max-w-7xl grid grid-cols-1 md:grid-cols-3 gap-x-5 gap-y-10 mx-auto mt-12 p-5">
      <CardProject
        title="Desarrollo del sitio web para CORLAD Cusco"
        imageSrc="/static/images/prueba2.png"
        imageAlt="Proyecto numero 1"
        type="Sitio web"
        client="Corlad Cusco"
        date="Agosto 2024"
      />
      <CardProject
        title="Campaña de Marketing Digital para el Congreso Internacional de Administración"
        imageSrc="/static/images/prueba5.png"
        imageAlt="Proyecto numero 1"
        type="Marketing digital"
        client="Corlad Cusco"
        date="Junio 2024"
      />
      <CardProject
        title="Desarrollo web para AER Athletic Club"
        imageSrc="/static/images/prueba3.png"
        imageAlt="AER. Athelitic Club"
        type="Sitio web"
        client="AER"
        date="noviembre 2023"
      />
      <CardProject
        title="Desarrollo web para Peruvian Cusco Travel Tour"
        imageSrc="/static/images/prueba4.png"
        imageAlt="Peruvian Cusco Travel Tour"
        type="Sitio web"
        client="Peruvian Cusco Travel Tour"
        date="noviembre 2023"
      />
      <CardProject
        title="Desarrollo web para Proyecto Paltos - Geragri"
        imageSrc="/static/images/prueba.png"
        imageAlt="Proyecto paltos"
        type="Sitio web"
        client="Geragri"
        date="noviembre 2024"
      />
    </div>
  )
}

export default ProjectsList;