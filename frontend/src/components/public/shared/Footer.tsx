"use client"

import Link from "next/link";
import { CiFacebook } from "react-icons/ci";
import { FaInstagram, FaTiktok } from "react-icons/fa";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Footer() {
  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };
  return (
    <div className="mt-12">
    <motion.div
      initial="hidden"
      whileInView="visible"
      variants={fadeIn}
      transition={{ duration: 0.8 }} // Duración de la animación
      className="relative" // Asegúrate de que el contenedor tenga posición relativa si necesitas superponer otros elementos
    >
      <Image
        className="w-full -mb-1"
        src="/static/images/background_footer.webp"
        alt="Fondo tecnológico"
        width={1800}
        height={1000}
        layout="responsive" // Cambia a "responsive" si quieres que la imagen se ajuste automáticamente
      />
    </motion.div>
       <div className="bg-primary py-5">
        <div className="container flex flex-col md:flex-row md:space-x-12 text-white w-11/12 md:w-4/6 mx-auto py-12">
          <div className='flex flex-col md:w-1/4 space-y-10 items-center my-auto'>
            <a href="https://www.facebook.com/" target="_blank" className="hover:text-[#A6C0D8] transition duration-300">
              <CiFacebook size={35} />
            </a>
            <a href="https://www.instagram.com/" target="_blank" className="hover:text-[#A6C0D8] transition duration-300">
              <FaInstagram size={30} />
            </a>
            <a href="https://www.tiktok.com/" target="_blank" className="hover:text-[#A6C0D8] transition duration-300">
              <FaTiktok size={30} />
            </a>
          </div>
          <div className='flex flex-col md:w-2/4 space-y-5 my-auto'>
            <div>
              <p>
                Descubre el poder de la innovación digital con Wonder Clouds.
                Impulsamos tu presencia en línea con soluciones creativas y estratégicas
                que elevan tu marca por encima de las nubes.
              </p>
            </div>
            <div className="flex flex-col md:flex-row md:space-x-5">
              <div className="flex flex-col">
                <span>Teléfono:</span>
                <span>+ 51 940576340</span>
              </div>
              <div className="flex flex-col mt-2 md:mt-0">
                <span>Correo Electrónico:</span>
                <span>wonderclouds.cusco@gmail.com</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col md:w-1/4 items-center">
            <Link href="/">
              <Image 
                className='w-3/6 md:w-5/6 lg:w-full mx-auto' 
                src="/static/images/clouds.png" 
                alt="Logo Wonder Clouds" 
                width={1000} 
                height={1000} 
              />
            </Link>
          </div>
        </div>
        <div className="text-center text-white font-nunito py-5">
          <span className="text-sm">
            <a href="https://www.wonderclouds.dev">Copyright © 2024 Wonder Clouds</a>
          </span>
        </div>
      </div>
    </div>
  )
}