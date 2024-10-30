import Image from "next/image";
import InicioWritting from "@/components/public/inicio/InicioWritting";
import MovingCirclesBackground from "@/components/public/ui/MovingCirclesBackground";
import Services from "@/components/public/inicio/Services";
import ProjectsCarousel from "@/components/public/inicio/ProjectsCarousel";
import WonderClouds from "@/components/public/inicio/WonderClouds";
import ContactUsForm from "@/components/public/inicio/ContactUsForm";

const Inicio = () => {
  return (
    <>
      <div className=" flex flex-row w-full lg:w-full items-center px-auto mx-auto mb-12 space-y-10 relative">
        <MovingCirclesBackground />
        <InicioWritting />
      </div>

      <div className="relative">
        <div className="relative w-full h-[400px] md:h-[500px] lg:h-[600px]">
          <Image
            src="/static/images/clouds_background.svg"
            alt="Imagen de fondo de nubes azules y celestes."
            layout="fill"
            objectFit="cover"
            className="w-full h-full"
          />
        </div>
        <WonderClouds />
      </div>

      <div className="container flex flex-col w-full lg:w-3/4 items-center relative space-y-20 mx-auto mt-12 lg:mt-24 px-5">
        <Services />
      </div>

      <div className="container items-center mx-auto mt-12 lg:mt-24 px-5">
        <h2 className="flex justify-center text-3xl text-default lg:text-4xl font-semibold">
          Nuestro <span className="ps-2 text-primary">Trabajo</span>
        </h2>
        <ProjectsCarousel />
      </div>

      <ContactUsForm />
    </>
  );
}

export default Inicio;