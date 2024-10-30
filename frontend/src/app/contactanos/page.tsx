"use client";

import { useState } from "react";
import { motion } from "framer-motion"; // Importa motion
import Breadcrumb from "@/components/public/ui/Breadcrumb";
import { Input } from "@nextui-org/input";
import { BadgeCheck, Mail, Phone, Send, User } from "lucide-react";

const Contactanos = () => {
  const [loading, setLoading] = useState(false);

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <>
      <div className="flex flex-col items-center my-6">
        <motion.h1
          className="text-3xl text-primary lg:text-5xl font-semibold text-center"
          initial="hidden"
          whileInView="visible"
          variants={fadeIn}
          transition={{ duration: 0.5 }}
        >
          Contáctanos
        </motion.h1>
        <div className="mt-4">
          <Breadcrumb />
        </div>
      </div>

      <div className="container flex flex-col w-full items-center lg:w-3/4 mx-auto mt-12">
        <div className="flex flex-row mx-12 justify-center space-x-10">
          <section className="w-1/2 text-xl px-10">
            <motion.h3
              className="text-5xl text-primary font-extrabold py-10"
              initial="hidden"
              whileInView="visible"
              variants={fadeIn}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              SÚBETE A NUESTRA NUBE
            </motion.h3>
            <motion.p
              className="text-xl"
              initial="hidden"
              whileInView="visible"
              variants={fadeIn}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Obtén una consulta gratuita para impulsar tu negocio al siguiente nivel.
              Ya sea que necesites una estrategia de <b>marketing digital</b> efectiva, <b>desarrollo de software a medida</b>,
              implementación de <b>chatbots</b> o soluciones tecnológicas innovadoras, nuestro equipo está aquí para ayudarte a alcanzar tus objetivos.
            </motion.p>
            <motion.h4
              className="text-3xl text-primary font-semibold pt-5 pb-2"
              initial="hidden"
              whileInView="visible"
              variants={fadeIn}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              ¿Por qué contactarnos?
            </motion.h4>
            <motion.p
              className="text-xl"
              initial="hidden"
              whileInView="visible"
              variants={fadeIn}
              transition={{ duration: 0.5, delay: 0.4  }}
            >
              Somos un equipo dedicado a brindar soluciones personalizadas que se adaptan a las necesidades de cada negocio, podemos ayudarte a:
            </motion.p>
            <ul className="font-bold mt-3 space-y-2">
              <motion.li
                className="flex items-center"
                initial="hidden"
                whileInView="visible"
                variants={fadeIn}
                transition={{ duration: 0.5, delay: 0.4  }}
              >
                <BadgeCheck className="mr-2 text-blue-500 w-5 h-5" />
                Aumentar tu visibilidad en línea
              </motion.li>
              <motion.li
                className="flex items-center"
                initial="hidden"
                whileInView="visible"
                variants={fadeIn}
                transition={{ duration: 0.5, delay: 0.4  }}
              >
                <BadgeCheck className="mr-2 text-blue-500 w-5 h-5" />
                Optimizar procesos internos y mejorar la eficiencia
              </motion.li>
              <motion.li
                className="flex items-center"
                initial="hidden"
                whileInView="visible"
                variants={fadeIn}
                transition={{ duration: 0.5, delay: 0.4  }}
              >
                <BadgeCheck className="mr-2 text-blue-500 w-5 h-5" />
                Crear conexiones significativas con tus clientes
              </motion.li>
            </ul>
          </section>

          <motion.div
            className="w-full max-w-xl mx-auto p-8 rounded-xl shadow-lg bg-white/80 backdrop-blur-sm"
            initial="hidden"
            whileInView="visible"
            variants={fadeIn}
            transition={{ duration: 0.5, delay: 0.4  }}
          >
            <div className="text-center mb-8">
              <h2 className="text-lg font-medium text-gray-600 mb-2">
                ¿Necesitas soluciones digitales?
              </h2>
              <h1 className="text-3xl lg:text-4xl font-bold text-[#104D7E] mb-3">
                No dudes en contactarnos
              </h1>
              <p className="text-gray-500">
                Nos pondremos en contacto contigo lo antes posible
              </p>
            </div>

            <form className="space-y-6">
              <div className="group transition-all duration-300 hover:scale-[1.02]">
                <Input
                  type="text"
                  variant="underlined"
                  placeholder="Nombres y apellidos"
                  size="lg"
                  startContent={
                    <User className="text-2xl text-[#104D7E] pointer-events-none flex-shrink-0" />
                  }
                  classNames={{
                    input: "text-lg",
                    inputWrapper: "pb-2"
                  }}
                />
              </div>

              <div className="group transition-all duration-300 hover:scale-[1.02]">
                <Input
                  type="email"
                  variant="underlined"
                  placeholder="Correo electrónico"
                  size="lg"
                  startContent={
                    <Mail className="text-2xl text-[#104D7E] pointer-events-none flex-shrink-0" />
                  }
                  classNames={{
                    input: "text-lg",
                    inputWrapper: "pb-2"
                  }}
                />
              </div>

              <div className="group transition-all duration-300 hover:scale-[1.02]">
                <Input
                  type="tel"
                  variant="underlined"
                  placeholder="Número de contacto"
                  size="lg"
                  startContent={
                    <Phone className="text-2xl text-[#104D7E] pointer-events-none flex-shrink-0" />
                  }
                  inputMode="numeric"
                  pattern="[0-9]*"
                  classNames={{
                    input: "text-lg",
                    inputWrapper: "pb-2"
                  }}
                />
              </div>

              <motion.button
                type="submit"
                disabled={loading}
                className="w-full bg-[#104D7E] hover:bg-[#1a65a3] text-white text-lg font-medium p-4 rounded-lg 
                transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg
                flex items-center justify-center gap-2 disabled:opacity-70"
                initial="hidden"
                whileHover={{ scale: 1.05 }} // Escala al pasar el ratón
                whileTap={{ scale: 0.95 }} // Escala al hacer clic
              >
                {loading ? (
                  <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    <span>Enviar mensaje</span>
                  </>
                )}
              </motion.button>
            </form>

            <div className="text-center text-sm text-gray-500 mt-8">
              <p>También puedes contactarnos en:</p>
              <p className="font-medium text-[#104D7E]">wonderclouds.cusco@gmail.com</p>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default Contactanos;
