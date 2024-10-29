import Image from "next/image";
import Header from "@/components/public/shared/Header";
import Footer from "@/components/public/shared/Footer";
import InicioWritting from "@/components/public/inicio/InicioWritting";
import MovingCirclesBackground from "@/components/public/ui/MovingCirclesBackground";
import Services from "@/components/public/inicio/Services";
import OurProjects from "@/components/public/inicio/OurProjects";
import { MailIcon, Phone, Send, User } from "lucide-react";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import WonderClouds from "@/components/public/inicio/WonderClouds";

export default function Home() {
  return (
    <div>
      <Header />

      <div className="container flex flex-row w-full lg:w-full items-center px-auto mx-auto mb-12 space-y-10 relative">
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
        <h2 className="text-3xl lg:text-4xl text-default font-semibold">
          Nuestros <span className="text-primary">Servicios</span>
        </h2>
        <Services />
      </div>

      <div className="container items-center mx-auto mt-12 lg:mt-24 px-5">
        <h2 className="flex justify-center text-3xl text-default lg:text-4xl font-semibold">
          Nuestro <span className="ps-2 text-primary">Trabajo</span>
        </h2>
        <OurProjects />
      </div>

      <div className="container flex flex-col w-full lg:w-3/4 mx-auto items-center mt-12 lg:mt-24">
        <h2 className="text-3xl text-default lg:text-4xl font-semibold">
          <span className="text-primary">Comunícate</span> con nosotros
        </h2>
        <div className="flex flex-row mx-12 justify-center space-x-10">
          <Image className="hidden lg:block w-1/2" src="/static/images/info.svg" width={500} height={500} alt="Imagen representativa" />
          <div className="w-1/2 text-default my-auto">
            <span className="text-medium font-semibold">¿Necesitas soluciones digitales?</span>
            <h3 className="text-3xl lg:text-4xl font-semibold mb-5">No dudes en contactarnos</h3>
            <div className="flex flex-col space-y-10">
              <Input
                type="text"
                variant="underlined"
                placeholder="Nombre"
                startContent={
                  <User className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                }
              />

              <Input
                type="email"
                variant="underlined"
                placeholder="Correo"
                startContent={
                  <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                }
              />

              <Input
                type="number"
                variant="underlined"
                placeholder="Teléfono"
                startContent={
                  <Phone className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                }
              />

              <Button className="bg-[#104D7E] text-white text-base rounded-lg mx-auto p-5 " startContent={<Send />}>Enviar</Button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}