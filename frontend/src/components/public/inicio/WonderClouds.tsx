"use client"

import { motion } from 'framer-motion';
import { useRef } from 'react';
import { useInView } from 'framer-motion';

export default function WonderClouds() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true }); // Disparar la animación una vez

  return (
    <motion.div
      ref={ref}
      className="flex flex-col justify-center items-center text-white bg-primary relative -mt-5 md:-mt-20 px-10 pb-20"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 50 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      {/* Título */}
      <motion.h1
        className="text-7xl font-bold"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        Wonder Clouds
      </motion.h1>

      {/* Descripción */}
      <motion.p
        className="text-2xl text-center mx-24 mt-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        En Wonder clouds nos encargamos de diseñar estrategias innovadoras para impulsar tu marca hacia nuevos horizontes y conectar con audiencias globales de manera impactante.
      </motion.p>

      {/* Texto de expertos */}
      <motion.span
        className="text-3xl font-semibold mt-5"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        Nuestros expertos están listos para ayudarte
      </motion.span>

      {/* Información de experiencia y clientes */}
      <motion.div
        className="flex flex-row space-x-20 mt-5"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
        transition={{ duration: 0.8, delay: 0.8 }}
      >
        <div className="flex flex-col text-center space-y-5">
          <h4 className="text-xl font-semibold">Experiencia</h4>
          <span className="text-5xl font-bold">2+</span>
        </div>
        <div className="flex flex-col text-center space-y-5">
          <h4 className="text-xl font-semibold">Clientes satisfechos</h4>
          <span className="text-5xl font-bold">10+</span>
        </div>
      </motion.div>
    </motion.div>
  );
}
