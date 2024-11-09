//components/public/nosotros/NosotrosTitle.tsx

"use client"

import Breadcrumb from "@/components/ui/Breadcrumb";
import Image from "next/image";
import { motion } from "framer-motion";

const NosotrosTitle = () => {

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <>
      <motion.div
        className="flex flex-col items-center pt-6"
        initial="hidden"
        whileInView="visible"
        variants={fadeInUp}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl text-center text-white font-bold lg:text-5xl">
          Nosotros
        </h1>
        <div className="mt-4">
          <Breadcrumb colorText="text-white" />
        </div>
      </motion.div>

      <div className="container mx-auto flex flex-col md:flex-row justify-center items-center text-white py-12 px-4 max-w-6xl">
        <motion.div
          className="w-full md:w-1/3"
          initial="hidden"
          whileInView="visible"
          variants={fadeInUp}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Image
            className="w-full rounded-lg"
            src={"/static/images/nosotros.png"}
            alt="Imagen representativa"
            width={1000}
            height={1000}
          />
        </motion.div>
        <motion.div
          className="w-full md:w-2/3 flex flex-col space-y-5 px-6 md:px-12"
          initial="hidden"
          whileInView="visible"
          variants={fadeInUp}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h2 className="text-5xl font-bold mb-2">Wonder Clouds</h2>
          <p className="text-lg leading-relaxed">
            En Wonder Clouds, somos una empresa nueva y emocionante en el
            mundo del marketing digital. Fundada en el corazón del encantador
            Cusco, nuestra misión es dejar una marca única en la industria y
            ofrecer soluciones digitales innovadoras que impulsen el éxito de
            nuestros clientes.
            <br />
            <br />
            Con un equipo joven y dinámico, estamos llenos de entusiasmo y
            creatividad para abordar los desafíos más grandes y llevar tus
            ideas a nuevas alturas en el vasto cielo digital. A pesar de ser
            nuevos en el mercado, estamos listos para hacer una diferencia
            significativa y convertirnos en líderes en el campo del marketing
            digital en la región y más allá.
          </p>
        </motion.div>
      </div>
    </>
  )
}

export default NosotrosTitle;