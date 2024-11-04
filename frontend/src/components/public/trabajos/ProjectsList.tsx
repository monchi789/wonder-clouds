import CardProject from "@/components/public/ui/CardProject"

const ProjectsList = () => {
  return (
    <div className="container grid grid-cols-1 md:grid-cols-4 gap-x-5 gap-y-10 mx-auto mt-12 p-5">
      <CardProject 
      title="Proyecto Paltos - Geragri" 
      imageSrc="/static/images/prueba.png"
      imageAlt="Proyecto numero 1"
      type="Página web"
      client="Geragri"
      date="noviembre 2020"
      />
      <CardProject 
      title="CORLAD - CUSCO" 
      imageSrc="/static/images/prueba2.png"
      imageAlt="Proyecto numero 1"
      type="Página web"
      client="Geragri"
      date="noviembre 2020"
      />
      <CardProject 
      title="AER. Athletic Club" 
      imageSrc="/static/images/prueba3.png"
      imageAlt="Proyecto numero 1"
      type="Página web"
      client="Geragri"
      date="noviembre 2020"
      />
      <CardProject 
      title="Peruvian Cusco Travel" 
      imageSrc="/static/images/prueba4.png"
      imageAlt="Proyecto numero 1"
      type="Página web"
      client="Geragri"
      date="noviembre 2020"
      />
    </div>
  )
}

export default ProjectsList;