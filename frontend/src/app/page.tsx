import Image from "next/image";
import Header from "@/components/public/shared/Header";
import Footer from "@/components/public/shared/Footer";
import Services from "@/components/public/shared/Services";
import { MailIcon, Phone, Send, User } from "lucide-react";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input"; 
import InicioWritting from "@/components/public/inicio/InicioWritting";

export default function Home() {
  return (
    <div className="relative">

      <Header />

      <InicioWritting />

      <div className="flex flex-col justify-center items-center text-white bg-[#104D7E] space-y-10 p-10 ">
        <h1 className="text-5xl font-bold">Wonder Clouds</h1>
        <p className="">Nos encargamos de diseñar estrategias innovadoras para impulsar tu marca hacia nuevos horizontes y conectar con audiencias globales de manera impactante.</p>
        <span className="text-2xl font-semibold">Nuestros expertos están listos para ayudarte</span>
        <div className="flex flex-row space-x-10">
          <div className="flex flex-col text-center space-y-5">
            <h4 className="text-lg font-semibold">Experiencia</h4>
            <span className="text-5xl font-bold">2+</span>
          </div>
          <div className="flex flex-col text-center space-y-5">
            <h4 className="text-lg font-semibold">Clientes satisfechos</h4>
            <span className="text-5xl font-bold">10+</span>
          </div>
        </div>
      </div>

      <div className="container flex flex-col w-full lg:w-3/4 mx-auto items-center mt-12 lg:mt-18 space-y-10 relative">
        <h2 className="text-3xl lg:text-4xl font-semibold">Nuestros <span className="text-default">Servicios</span></h2>
        <Services />
      </div>
      
      <div className="container flex flex-col w-full lg:w-3/4 mx-auto items-center mt-12 lg:mt-24">
        <h2 className="text-3xl lg:text-4xl font-semibold"><span className="text-default">Comunícate</span> con nosotros</h2>
        <div className="flex flex-row mx-12 justify-center space-x-10">
          <Image className="hidden lg:block w-1/2" src="/static/images/info.svg" width={500} height={500} alt="Imagen representativa" />
          <div className="w-1/2 my-auto">
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