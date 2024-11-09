"use client"

import { motion } from 'framer-motion';
import Image from "next/image";
import Link from 'next/link';
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
      <div className="w-full flex flex-col justify-center lg:flex-row items-center relative overflow-hidden space-y-5 space-x-20 px-4 lg:px-0 z-10">

        {/* Contenedor animado del texto */}
        <motion.div
          className="flex flex-col w-full lg:w-2/5"
          initial={{ x: '-100%', opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
        >
          <span className="text-3xl text-default lg:text-6xl font-extrabold leading-tight">
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
            <Link href={"/contactanos"} className="transition-all duration-500 group-hover:translate-x-1">
              Contáctanos
            </Link>
            <svg
              className="w-7 h-7 transition-transform duration-500 group-hover:translate-x-1"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z"
                fillRule="evenodd"
                clipRule="evenodd"
              />
            </svg>
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
              x: [0, -10, 10, -10, 10, 0], // Se mueve en el eje x
              y: [0, -10, 10, 10, -10, 0]  // Se mueve en el eje y
            }}
            transition={{
              duration: 5, // Duración de todo el ciclo
              repeat: Infinity, // Repetición infinita
              repeatType: "loop",
              ease: "easeInOut", // Suavizado
            }}
            className="w-auto h-auto" // Añade clases adicionales si necesitas
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