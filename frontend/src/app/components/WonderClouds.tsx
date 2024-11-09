"use client"

import { motion } from 'framer-motion';
import { Cloud, Sparkles, Stars } from 'lucide-react';
import Image from "next/image";
import Link from 'next/link';

export default function WonderClouds() {
  const fadeInUpVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const statsData = [
    { label: "Años de trayectoria", value: "2+" },
    { label: "Clientes satisfechos", value: "10+" },
    { label: "Proyectos completados", value: "15+" }
  ];
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
        className="flex flex-col items-center text-white bg-gradient-to-b from-primary to-primary/90 relative min-h-[80vh] px-4 md:px-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {/* Elementos decorativos */}
        <motion.div
          className="absolute top-10 right-10 text-white/20"
          animate={{
            rotate: -360,
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        >
          <Stars size={60} />
        </motion.div>

        <motion.div
          className="absolute bottom-72 left-10 text-white/20"
          animate={{
            rotate: 360,
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        >
          <Cloud size={80} />
        </motion.div>

        <motion.div
          className="relative"
          variants={fadeInUpVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div
            className="absolute hidden md:block -top-5 -left-8 text-yellow-300"
            animate={{
              rotate: -360,
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          >
            <Sparkles size={24} />
          </motion.div>

          <h1 className="text-5xl md:text-7xl font-bold text-white text-center">
            Wonder Clouds
          </h1>
        </motion.div>


        <motion.p
          className="text-xl md:text-2xl text-center max-w-4xl mt-10 text-white/90"
          variants={fadeInUpVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          En Wonder Clouds nos encargamos de diseñar estrategias innovadoras para
          impulsar tu marca hacia nuevos horizontes y conectar con audiencias
          globales de manera impactante.
        </motion.p>

        <motion.div
          className="mt-10"
          variants={fadeInUpVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h2 className="text-2xl md:text-3xl font-semibold text-center">
            Nuestros expertos están listos para ayudarte
          </h2>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-16"
          variants={fadeInUpVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {statsData.map((stat, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center space-y-3 p-6 rounded-xl bg-white/5 backdrop-blur-sm"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <span className="text-lg font-semibold text-white/80">{stat.label}</span>
              <span className="text-4xl md:text-5xl font-bold">{stat.value}</span>
            </motion.div>
          ))}
        </motion.div>

        <Link href="/contactanos" className="inline-block">
          <motion.div
            className="bg-white text-primary rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all mt-16 px-8 py-4 cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Comienza ahora
          </motion.div>
        </Link>
      </motion.div>
    </>
  );
}
