"use client"

import ServiceCard from "@/components/public/ui/ServiceCard";
import { motion } from 'framer-motion';

export default function Services() {

  const services = [
    {
      title: "Marketing digital",
      imageSrc: "/static/images/service_01.svg",
      imageAlt: "Servicio numero uno"
    },
    {
      title: "Desarrollo de páginas web",
      imageSrc: "/static/images/service_02.webp",
      imageAlt: "Servicio numero dos"
    },
    {
      title: "Desarrollo de software a medida",
      imageSrc: "/static/images/service_03.svg",
      imageAlt: "Servicio numero tres"
    },
    {
      title: "Integración del Chatbots para respuestas automatizadas",
      imageSrc: "/static/images/service_04.webp",
      imageAlt: "Servicio numero cuatro"
    },
    {
      title: "Instalación de cámaras",
      imageSrc: "/static/images/service_05.webp",
      imageAlt: "Servicio numero cinco"
    },
    {
      title: "Delivery de servicio técnico",
      imageSrc: "/static/images/service_06.webp",
      imageAlt: "Servicio numero seis"
    }
  ]

  return (
    <>
      <motion.h2
        className="text-3xl lg:text-4xl text-default font-semibold"
        initial={{ opacity: 0, y: 20 }} 
        whileInView={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.6, ease: "easeOut" }} 
        viewport={{ once: true, amount: 0.2 }} 
      >
        Nuestros <span className="text-primary">Servicios</span>
      </motion.h2>
      <motion.section
        className="w-full grid grid-cols-1 md:grid-cols-3 gap-x-10 gap-y-10"
        initial={{ opacity: 0, y: 20 }} 
        whileInView={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.6, ease: "easeOut" }} 
        viewport={{ once: true, amount: 0.2 }} 
      >
        {services.map((item, key) => (
          <ServiceCard
            key={key}
            link=""
            title={item.title}
            imageSrc={item.imageSrc}
            imageAlt={item.imageAlt}
          />
        ))}
      </motion.section>
    </>
  )
}