import CardProject from "@/components/public/ui/CardProject"

const ProjectsList = () => {
  return (
    <div className="container grid grid-cols-1 md:grid-cols-3 gap-x-5 gap-y-10 mx-auto mt-12">
      <CardProject 
      title="Proyecto Paltos - Geragri" 
      imageSrc="/static/images/prueba.png"
      imageAlt="Proyecto numero 1"
      type="Pagina web"
      client="Geragri"
      date="noviembre 2020"
      />
      <CardProject 
      title="Proyecto Paltos - Geragri" 
      imageSrc="/static/images/prueba2.png"
      imageAlt="Proyecto numero 1"
      type="Pagina web"
      client="Geragri"
      date="noviembre 2020"
      />
      <CardProject 
      title="Proyecto Paltos - Geragri" 
      imageSrc="/static/images/prueba3.png"
      imageAlt="Proyecto numero 1"
      type="Pagina web"
      client="Geragri"
      date="noviembre 2020"
      />
      <CardProject 
      title="Proyecto Paltos - Geragri" 
      imageSrc="/static/images/prueba.png"
      imageAlt="Proyecto numero 1"
      type="Pagina web"
      client="Geragri"
      date="noviembre 2020"
      />
      <CardProject 
      title="Proyecto Paltos - Geragri" 
      imageSrc="/static/images/prueba2.png"
      imageAlt="Proyecto numero 1"
      type="Pagina web"
      client="Geragri"
      date="noviembre 2020"
      />
      <CardProject 
      title="Proyecto Paltos - Geragri" 
      imageSrc="/static/images/prueba3.png"
      imageAlt="Proyecto numero 1"
      type="Pagina web"
      client="Geragri"
      date="noviembre 2020"
      />
    </div>
  )
}

export default ProjectsList;