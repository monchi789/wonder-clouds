import InicioWritting from "@/app/components/HeroSection";
import MovingCirclesBackground from "@/components/ui/MovingCirclesBackground";
import Services from "@/app/components/Services";
import ProjectsCarousel from "@/app/components/ProjectsCarousel";
import WonderClouds from "@/app/components/WonderClouds";
import ContactUsForm from "@/app/components/ContactUsForm";

const Inicio = () => {
  return (
    <>
      <div className=" flex flex-row w-full lg:w-full items-center px-auto mx-auto mb-12 space-y-10 relative">
        <MovingCirclesBackground />
        <InicioWritting />
      </div>

      <WonderClouds />

      <div className="container flex flex-col w-full lg:w-3/4 items-center relative space-y-20 mx-auto mt-24 px-5">
        <Services />
      </div>

      <div className="container flex flex-col w-full lg:w-3/4 items-center relative space-y-20 mx-auto mt-40">
        <ProjectsCarousel />
      </div>

      <div className="flex flex-row w-full lg:w-full items-center space-y-10 relative mx-auto mt-24 px-auto">
        <MovingCirclesBackground />
        <ContactUsForm />
      </div>
    </>
  );
}

export default Inicio;