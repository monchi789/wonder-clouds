import CardService from "@/components/public/ui/CardService";

export default function Services() {

  const services = [
    {
      title: "Presencia Digital de Marca",
      imageSrc: "/static/images/service_01.svg",
      imageAlt: "Servicio numero uno"
    },
    {
      title: "Marketing Digital 360",
      imageSrc: "/static/images/service_02.svg",
      imageAlt: "Servicio numero dos"
    },
    {
      title: "Branding e Identidad de Marca",
      imageSrc: "/static/images/service_03.svg",
      imageAlt: "Servicio numero tres"
    },
    {
      title: "Organización de Eventos",
      imageSrc: "/static/images/service_04.svg",
      imageAlt: "Servicio numero cuatro"
    },
    {
      title: "Desarrollo Web Personalizado",
      imageSrc: "/static/images/service_05.svg",
      imageAlt: "Servicio numero cinco"
    },
    {
      title: "Gestión de Redes Sociales",
      imageSrc: "/static/images/service_06.svg",
      imageAlt: "Servicio numero seis"
    }
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-x-10 gap-y-10 w-full">
      {
        services.map((item, key) => (
          <CardService key={key} link="" title={item.title} imageSrc={item.imageSrc} imageAlt={item.imageAlt} />
        ))
      }
    </div>
  )
}