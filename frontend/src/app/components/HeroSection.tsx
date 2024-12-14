"use client"

import { motion } from 'framer-motion';
import Image from "next/image";
import Link from 'next/link';
import { Button } from "@nextui-org/button";
import { useTypewriter, Cursor } from 'react-simple-typewriter';

const HeroSection = () => {
  const [text] = useTypewriter({
    words: ['TU MARCA', 'TU NEGOCIO', 'TU EMPRESA'],
    loop: 0,
    typeSpeed: 70,
    deleteSpeed: 50,
    delaySpeed: 1000,
  });
  return (
    <>
      <div className="max-w-8xl mx-auto flex flex-col justify-center lg:flex-row items-center relative overflow-hidden z-10 space-y-5 space-x-20 px-4 lg:px-0">

        {/* Contenedor animado del texto */}
        <motion.div
          className="flex flex-col w-full lg:w-2/5"
          initial={{ x: '-100%', opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
        >
          <span className="text-default text-3xl lg:text-5xl font-monserrat font-extrabold leading-tight">
            Es momento de que <br />
            <span className="text-primary">{text}</span>
            <Cursor cursorColor="#104D7E" /> <br />
            suba al siguiente nivel
          </span>
          <span className="text-lg text-default lg:text-2xl mt-10">
            En Wonder Clouds nos encargamos de diseñar estrategias innovadoras para impulsar tu marca
            hacia nuevos horizontes y conectar con audiencias globales de manera impactante.
          </span>
          <Button size='lg' className="w-fit flex items-center group text-2xl text-white bg-primary rounded-xl transition-transform duration-300 ease-in-out hover:scale-105 active:scale-95 gap-2 mt-5 px-5">
            <Link href={"/contactanos"} className="transition-all duration-500 group-hover:translate-x-1 my-auto">
              Contáctanos
            </Link>
          </Button>
        </motion.div>

        {/* Imagen animada */}
        <motion.div
          className="hidden lg:block lg:w-2/6 z-10"
          initial={{ x: '100%', opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
        >
          <motion.div
            initial={{ x: 0, y: 0 }}
            animate={{
              x: [0, -10, 10, -10, 10, 0], 
              y: [0, -10, 10, 10, -10, 0]  
            }}
            transition={{
              duration: 5, 
              repeat: Infinity, 
              repeatType: "loop",
              ease: "easeInOut", 
            }}
            className="w-auto h-auto" 
          >
            <Image
              src="/static/images/inicio.svg"
              width={1000}
              height={1000}
              alt="Imagen representativa"
            />
          </motion.div>
        </motion.div>
      </div>
    </>
  )
}

export default HeroSection;