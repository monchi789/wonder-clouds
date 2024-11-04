"use client"

import { motion } from 'framer-motion';
import Image from "next/image";

export default function WonderClouds() {
  return (
    <>
      <motion.div
        initial={{ scale: 0.8, rotate: -10, opacity: 0 }}
        animate={{ scale: 1, rotate: 0, opacity: 1 }}
        transition={{ duration: 1.0, ease: 'easeOut' }}
        className="relative w-full h-[400px] md:h-[500px] lg:h-[600px]"
      >
        <Image
          src="/static/images/clouds_background.svg"
          alt="Imagen de fondo de nubes azules y celestes."
          layout="fill"
          objectFit="cover"
          className="w-full h-full"
        />
      </motion.div>
      <motion.div
        className="flex flex-col justify-center items-center text-white bg-primary relative -mt-5 md:-mt-20 px-10 pb-20"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.2 }}        
      >
        {/* Título */}
        <motion.h1
          className="text-7xl font-bold"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 20 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Wonder Clouds
        </motion.h1>

        {/* Descripción */}
        <motion.p
          className="text-2xl text-center mx-24 mt-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 20 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          En Wonder clouds nos encargamos de diseñar estrategias innovadoras para impulsar tu marca hacia nuevos horizontes y conectar con audiencias globales de manera impactante.
        </motion.p>

        {/* Texto de expertos */}
        <motion.span
          className="text-3xl font-semibold mt-5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 20 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Nuestros expertos están listos para ayudarte
        </motion.span>

        {/* Información de experiencia y clientes */}
        <motion.div
          className="flex flex-row space-x-20 mt-5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 20 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="flex flex-col text-center space-y-5">
            <span className="text-xl font-semibold">Experiencia</span>
            <span className="text-5xl font-bold">2+</span>
          </div>
          <div className="flex flex-col text-center space-y-5">
            <span className="text-xl font-semibold">Clientes satisfechos</span>
            <span className="text-5xl font-bold">10+</span>
          </div>
        </motion.div>
      </motion.div>
    </>
  );
}
