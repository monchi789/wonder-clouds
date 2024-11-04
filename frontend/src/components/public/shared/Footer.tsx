//components/public/shared/Footer.tsx

"use client"

import Link from "next/link";
import { FaFacebook, FaInstagram, FaLinkedin, FaTiktok } from "react-icons/fa";
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
        transition={{ duration: 0.8 }}
        className="relative"
      >
        <Image
          className="w-full -mb-1"
          src="/static/images/background_footer.webp"
          alt="Fondo tecnológico"
          width={1800}
          height={1000}
          layout="responsive"
          priority
        />
      </motion.div>

      <div className="bg-primary pt-10 pb-5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between gap-8 text-white max-w-6xl mx-auto py-8">
            <div className="flex md:flex-col justify-center items-center gap-8 md:gap-10 order-3 md:order-1 md:w-1/4">
              <a
                href="https://www.facebook.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#A6C0D8] transition duration-300"
                aria-label="Visita nuestra página de Facebook"
              >
                <FaFacebook size={30} />
              </a>
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#A6C0D8] transition duration-300"
                aria-label="Visita nuestra página de Instagram"
              >
                <FaInstagram size={30} />
              </a>
              <a
                href="https://www.tiktok.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#A6C0D8] transition duration-300"
                aria-label="Visita nuestra página de Tiktok"
              >
                <FaTiktok size={30} />
              </a>
              <a
                href="https://www.linkedin.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#A6C0D8] transition duration-300"
                aria-label="Visita nuestra página de Linkedin"
              >
                <FaLinkedin size={30} />
              </a>
            </div>

            <div className="space-y-6 order-2 md:w-2/4 text-center md:text-left">
              <p className="text-sm sm:text-base">
                Descubre el poder de la innovación digital con Wonder Clouds.
                Impulsamos tu presencia en línea con soluciones creativas y estratégicas
                que elevan tu marca por encima de las nubes.
              </p>
              <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-4 sm:gap-8">
                <div className="flex flex-col">
                  <span className="font-semibold text-sm">Teléfono:</span>
                  <span className="text-sm">+ 51 940576340</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-semibold text-sm">Correo Electrónico:</span>
                  <span className="text-sm break-all">wonderclouds.cusco@gmail.com</span>
                </div>
              </div>
            </div>

            <div className="flex justify-center order-1 md:order-3 md:w-1/4">
              <Link href="/">
                <Image 
                  className="w-32 sm:w-40 md:w-48 lg:w-full max-w-[200px]"
                  src="/static/images/clouds.png"
                  alt="Logo Wonder Clouds"
                  width={1000}
                  height={1000}
                  priority
                />
              </Link>
            </div>
          </div>
        </div>

        <div className="text-center text-white border-t border-white/10 mt-8 pt-6">
          <span className="text-xs sm:text-sm">
            <a href="https://www.wonderclouds.dev" className="hover:text-[#A6C0D8] transition duration-300">
              Copyright © 2024 Wonder Clouds
            </a>
          </span>
        </div>
      </div>
    </div>
  );
}