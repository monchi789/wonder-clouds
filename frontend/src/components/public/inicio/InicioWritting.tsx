"use client"

import { motion } from 'framer-motion';
import Image from "next/image";
import { Button } from "@nextui-org/button";
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
    <>
      <div className="relative w-full overflow-hidden">
      <div className="flex flex-col justify-center lg:flex-row items-center w-full space-y-5 space-x-20 px-4 lg:px-0 z-10">
        
        {/* Contenedor animado del texto */}
        <motion.div
          className="flex flex-col w-full lg:w-2/5"
          initial={{ x: '-100%', opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
        >
          <h3 className="text-3xl text-default lg:text-6xl font-extrabold leading-tight">
            Es momento de que <br />
            <span className="text-primary">{text}</span>
            <Cursor cursorColor="#104D7E" /> <br />
            suba al siguiente nivel
          </h3>
          <span className="text-lg text-default lg:text-2xl mt-10">
            En Wonder Clouds nos encargamos de diseñar estrategias innovadoras para impulsar tu marca
            hacia nuevos horizontes y conectar con audiencias globales de manera impactante.
          </span>
          <Button className="bg-primary text-2xl text-white font-medium rounded-2xl w-fit mt-5 px-5 py-1">
            Contáctanos
          </Button>
        </motion.div>

        {/* Imagen animada */}
        <motion.div
          className="hidden lg:block lg:w-2/5 z-10"
          initial={{ x: '100%', opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
        >
          <Image src="/static/images/image_01.svg" width={1000} height={1000} alt="Imagen representativa" />
        </motion.div>
      </div>
    </div>
    </>
  )
}