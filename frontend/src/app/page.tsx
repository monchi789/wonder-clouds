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

      <WonderClouds />

      <div className="container flex flex-col w-full lg:w-3/4 items-center relative space-y-20 mx-auto mt-12 lg:mt-24 px-5">
        <Services />
      </div>

      <div className="container flex flex-col w-full lg:w-3/4 items-center relative space-y-20 mx-auto mt-12 lg:mt-24 px-5">
        <ProjectsCarousel />
      </div>

      <div className=" flex flex-row w-full lg:w-full items-center px-auto mx-auto mb-12 space-y-10 relative">
        <MovingCirclesBackground />
        <ContactUsForm />
      </div>
    </>
  );
}

export default Inicio;