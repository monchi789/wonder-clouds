import FeatureCard from "@/components/ui/FeatureCard";
import ServiciosTitle from "./components/ServiciosTitle";

function Servicios() {
  const services = [
    {
      title: "Desarrollo de Software a Medida",
      imageSrc: "/static/images/service_03.svg",
      imageAlt: "Desarrollo de Software",
      description: "Soluciones tecnológicas completamente personalizadas que se adaptan perfectamente a las necesidades específicas de tu negocio, aumentando la eficiencia y la productividad.",
      tags: ["Personalización", "Productividad", "Eficiencia"]
    },
    {
      title: "Desarrollo de Aplicaciones Móviles",
      imageSrc: "/static/images/service_06.webp",
      imageAlt: "Aplicaciones Móviles Multiplataforma",
      description: "Creamos aplicaciones móviles innovadoras e intuitivas para iOS y Android, diseñadas para expandir tu alcance digital y mejorar la experiencia de tus usuarios.",
      tags: ["iOS", "Android", "Innovación", "Experiencia de usuario"]
    },
    {
      title: "Desarrollo de Sitios Web",
      description: "Diseñamos sitios web modernos, responsivos y optimizados para SEO que no solo capturan la esencia de tu marca, sino que también convierten visitantes en clientes.",
      imageSrc: "/static/images/service_02.webp",
      imageAlt: "Desarrollo de Páginas Web",
      tags: ["Desarrollo a medida", "Escalabilidad", "Soporte técnico"]
    },
    {
      title: "Estrategias de Marketing Digital",
      imageSrc: "/static/images/service_01.svg",
      imageAlt: "Marketing Digital",
      description: "Desarrollamos estrategias de marketing digital integrales que aumentan tu visibilidad online, generan leads de calidad y impulsan el crecimiento de tu negocio.",
      tags: ["Marca digital", "Identidad", "Visibilidad"]
    },
    {
      title: "Integración de Chatbots",
      description: "Implementamos chatbots con inteligencia artificial que automatizan la atención al cliente, mejoran la experiencia de usuario y aumentan la eficiencia de tu servicio.",
      imageSrc: "/static/images/service_04.webp",
      imageAlt: "Chatbots Personalizados",
      tags: ["Automatización", "Atención al cliente", "Planificación"]
    },
    {
      title: "Diseño UX/UI",
      description: "Creamos interfaces de usuario innovadoras y experiencias de usuario excepcionales que conectan emocionalmente con tus usuarios y mejoran la interacción con tu producto.",
      imageSrc: "/static/images/service_05.webp",
      imageAlt: "Diseño UX/UI",
      tags: ["Diseño innovador", "Experiencia de usuario", "Interactividad"]
    }
  ];  

  return (
    <>
      <ServiciosTitle/>

      <div className="container grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-10 mx-auto mt-12 p-5">
        {
          services.map((service, key) => (
            <FeatureCard
              key={key}
              title={service.title}
              description={service.description}
              imageSrc={service.imageSrc}
              tags={service.tags}
            />
          ))}
      </div>
    </>
  );
}

export default Servicios;
