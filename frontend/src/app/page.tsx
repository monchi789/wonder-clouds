'use client'

import Image from "next/image";
import Header from "../components/public/shared/Header";
import { Footer } from "@/components/public/shared/Footer";
import Services from "@/components/public/shared/Services";
import MovingCirclesBackground from "@/components/public/ui/MovingCirclesBackground";
import { MailIcon, Phone, Send, User } from "lucide-react";
import { useTypewriter, Cursor } from 'react-simple-typewriter';
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";

export default function Home() {
  const [text] = useTypewriter({
    words: ['TU MARCA', 'TU NEGOCIO', 'TU EMPRESA'],
    loop: 0,
    typeSpeed: 70,
    deleteSpeed: 50,
    delaySpeed: 1000,
  });

  return (
    <div className="relative">
      <Header />
      <div className="container flex flex-row w-full lg:w-full mx-auto items-center my-12 lg:mt-5 space-y-10 relative">
      <MovingCirclesBackground />
        <div className="flex flex-col w-full lg:w-full space-y-5 px-4 lg:px-0 z-10"> 
          <h3 className="text-3xl lg:text-5xl font-extrabold leading-tight">
            Es momento de que <br />
            <span className="text-[#104D7E]">{text}</span>
            <Cursor cursorColor="#104D7E" /> <br />
            suba al siguiente nivel
          </h3>
          <span className="text-lg lg:text-xl">
            En Wonder Clouds nos encargamos de diseñar estrategias innovadoras para impulsar tu marca
            hacia nuevos horizontes y conectar con audiencias globales de manera impactante.
          </span>
          <Button className="bg-[#104D7E] text-xl text-white font-medium rounded-2xl w-fit px-5 py-1">Contáctanos</Button>
        </div>
        <Image className="hidden lg:block w-2/6 z-10" src="/static/images/image_01.svg" width={1000} height={1000} alt="Imagen representativa" />
      </div>

      <div className="flex flex-col justify-center items-center text-white bg-[#104D7E] space-y-5 p-10 ">
        <h1 className="text-3xl">Wonder Clouds</h1>
        <p className="">Nos encargamos de diseñar estrategias innovadoras para impulsar tu marca hacia nuevos horizontes y conectar con audiencias globales de manera impactante.</p>
        <span className="font-bold">Nuestros expertos están listos para ayudarte</span>
      </div>

      <div className="container flex flex-col w-full lg:w-3/4 mx-auto items-center mt-12 lg:mt-18 space-y-10 relative">
        <h2 className="text-3xl lg:text-4xl font-semibold">Nuestros Servicios</h2>
        <Services />
      </div>
      <div className="container flex flex-col w-full lg:w-3/4 mx-auto items-center mt-12 lg:mt-24 space-y-10">
        <h2 className="text-3xl lg:text-4xl font-semibold mb-10">Comunícate con nosotros</h2>
        <div className="flex flex-row mx-24 justify-center space-x-20">
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
              <Button className="bg-[#104D7E] text-white text-base mx-auto p-5" startContent={<Send />}>Enviar</Button>
            </div>
          </div>
          <img className="hidden lg:block w-1/3" src="/images/image02.png" width={500} height={500} alt="Imagen representativa" />
        </div>
      </div>
      <Footer />
    </div>
  );
}