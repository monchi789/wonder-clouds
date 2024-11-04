import Breadcrumb from "@/components/public/ui/Breadcrumb";
import FeatureCard from "@/components/public/ui/FeatureCard";

function Servicios() {
  return (
    <>
      <div className="flex flex-col items-center mt-6">
        <h1 className="text-3xl text-primary lg:text-5xl font-semibold text-center">Servicios</h1>
        <div className="mt-4">
          <Breadcrumb />
        </div>
      </div>

      <div className="container grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-10 mx-auto mt-12 p-5">
        <FeatureCard
          title="Presencial digital de marca"
          description="Ofrecemos soluciones innovadoras para el desarrollo de marcas que resaltan en el mundo digital. Nuestros expertos te guiarán en la creación de una presencia de marca sólida y atractiva."
          imageSrc="/static/images/service_01.svg"
          tags={["Marca digital", "Identidad", "Visibilidad"]}
        />
        <FeatureCard
          title="Desarrollo de software personalizado"
          description="Creamos software a medida que se adapta a las necesidades específicas de tu negocio, asegurando una solución eficiente y escalable que potencia tu crecimiento."
          imageSrc="/static/images/service_02.svg"
          tags={["Desarrollo a medida", "Escalabilidad", "Soporte técnico"]}
        />
        <FeatureCard
          title="Implementación de chatbots"
          description="Optimiza la atención al cliente y mejora la experiencia de usuario con chatbots inteligentes que pueden interactuar y resolver consultas de manera eficiente."
          imageSrc="/static/images/service_03.svg"
          tags={["Automatización", "Atención al cliente", "Interacción"]}
        />
        <FeatureCard
          title="Organización de eventos"
          description="Nos encargamos de cada detalle en la planificación y ejecución de eventos, garantizando experiencias memorables y exitosas que cumplen con tus objetivos."
          imageSrc="/static/images/service_04.svg"
          tags={["Eventos", "Planificación", "Experiencias"]}
        />
      </div>
    </>
  );
}

export default Servicios;
