'use client'

import Image from "next/image";
import { Button } from "@nextui-org/button";
import MovingCirclesBackground from "@/components/public/ui/MovingCirclesBackground";
import { useTypewriter, Cursor } from 'react-simple-typewriter';

export default function InicioWritting() {
  const [text] = useTypewriter({
    words: ['TU MARCA', 'TU NEGOCIO', 'TU EMPRESA'],
    loop: 0,
    typeSpeed: 70,
    deleteSpeed: 50,
    delaySpeed: 1000,
  });
  return (
    <div className="container flex flex-row w-full lg:w-full items-center px-auto mx-auto mb-12 space-y-10 relative">
        <MovingCirclesBackground />
        <div className="flex flex-col w-full lg:w-full space-y-5 px-4 lg:px-0 z-10">
          <h3 className="text-3xl lg:text-5xl font-extrabold leading-tight">
            Es momento de que <br />
            <span className="text-default">{text}</span>
            <Cursor cursorColor="#104D7E" /> <br />
            suba al siguiente nivel
          </h3>
          <span className="text-lg lg:text-xl">
            En Wonder Clouds nos encargamos de diseñar estrategias innovadoras para impulsar tu marca
            hacia nuevos horizontes y conectar con audiencias globales de manera impactante.
          </span>
          <Button className="bg-default text-xl text-white font-medium rounded-2xl w-fit px-5 py-1">Contáctanos</Button>
        </div>
        <Image className="hidden lg:block w-2/6 z-10" src="/static/images/image_01.svg" width={1000} height={1000} alt="Imagen representativa" />
      </div>
  )
}