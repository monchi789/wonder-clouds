"use client"

import Image from "next/image";
import { motion } from "framer-motion";
import Breadcrumb from "@/components/ui/Breadcrumb";
import { ArrowRight, Users, Rocket, Target } from 'lucide-react';
import Link from "next/link";

const NosotrosTitle = () => {
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const stats = [
    {
      icon: <Users className="w-6 h-6 text-blue-400" />,
      value: "10+",
      label: "Aliados estratégicos"
    },
    {
      icon: <Rocket className="w-6 h-6 text-blue-400" />,
      value: "15+",
      label: "Proyectos Exitosos"
    },
    {
      icon: <Target className="w-6 h-6 text-blue-400" />,
      value: "95%",
      label: "Satisfacción"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-primary to-white">
      {/* Header Section */}
      <div className="container mx-auto pt-6 px-4">
        <motion.div
          className="flex flex-col items-center text-center mb-8"
          initial="hidden"
          whileInView="visible"
          variants={fadeInUp}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-5xl md:text-6xl text-white font-bold mt-12 mb-4">
            Nosotros
          </h1>
          <Breadcrumb colorText="text-white/80" />
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Column - Image */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={fadeInUp}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative"
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
                src="/static/images/cohete.webp"
                alt="Wonder Clouds Team"
                width={600}
                height={600}
                className="rounded-2xl"
              />
            </motion.div>
            {/* Decorative Elements */}
            <div className="absolute -bottom-4 -right-4 w-full h-full bg-blue-500/20 rounded-2xl -z-10" />
            <div className="absolute -top-4 -left-4 w-full h-full bg-purple-500/20 rounded-2xl -z-10" />
          </motion.div>

          {/* Right Column - Content */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={fadeInUp}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="space-y-6"
          >
            <div className="inline-block px-4 py-2 bg-blue-500/10 rounded-full">
              <span className="text-blue-400 font-semibold">
                Innovación Digital
              </span>
            </div>

            <h2 className="text-4xl md:text-7xl font-bold text-white">
              Wonder Clouds
            </h2>

            <p className="text-lg text-gray-300 leading-relaxed">
              En Wonder Clouds, somos una empresa emergente apasionada por el mundo digital. Desde el corazón de Cusco,
              transformamos y potenciamos los negocios de nuestros clientes mediante soluciones digitales innovadoras.
            </p>

            <p className="text-lg text-gray-300 leading-relaxed">
              Nuestro equipo joven fusiona creatividad y experiencia técnica para llevar tu presencia digital al siguiente nivel.
              Con un enfoque en la innovación constante y la excelencia en cada proyecto, trabajamos de la mano con nuestros clientes para crear
              soluciones digitales únicas.
            </p>

            {/* CTA Button */}
            <Link
              href={"/proyectos"}
              className="inline-block">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-6 py-3 bg-primary 
                         text-white rounded-full font-semibold transition-colors mt-8"
              >
                Conoce lo que hacemos
                <ArrowRight className="w-5 h-5" />
              </motion.div>
            </Link>
          </motion.div>
        </div>

        {/* Stats Section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={fadeInUp}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="grid md:grid-cols-3 gap-8 mt-20"
        >
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white/20 backdrop-blur-lg rounded-2xl p-6 text-center
                         border border-white/10 transition-all
                         hover:transform hover:-translate-y-1"
            >
              <div className="flex justify-center color-primary mb-4">{stat.icon}</div>
              <h3 className="text-3xl font-bold text-gray-700 mb-2">{stat.value}</h3>
              <p className="text-gray-700">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default NosotrosTitle;