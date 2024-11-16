"use client"

import ServiceCard from "@/components/ui/ServiceCard";
import { motion } from 'framer-motion';

export default function Services() {

  const services = [
    {
      title: "Diseño y Desarrollo de Páginas Web Profesionales",
      imageSrc: "/static/images/service_02.webp",
      imageAlt: "Desarrollo de Páginas Web",
      description: "Creamos páginas web atractivas y funcionales que representan tu marca y mejoran tu presencia digital."
    },
    {
      title: "Desarrollo de Estrategias de Marketing Digital",
      imageSrc: "/static/images/service_01.svg",
      imageAlt: "Marketing Digital",
      description: "Impulsa tu negocio online con estrategias de marketing digital personalizadas."
    },
    {
      title: "Desarrollo de Software a Medida",
      imageSrc: "/static/images/service_03.svg",
      imageAlt: "Desarrollo de Software",
      description: "Soluciones de software personalizadas para optimizar y hacer crecer tu negocio."
    },
    {
      title: "Integración de Chatbots Personalizados",
      imageSrc: "/static/images/service_04.webp",
      imageAlt: "Integración de Chatbots",
      description: "Implementa chatbots inteligentes para mejorar la atención y experiencia de tus clientes."
    },
    {
      title: "Instalación de Cámaras de Seguridad",
      imageSrc: "/static/images/service_05.webp",
      imageAlt: "Cámaras de Seguridad",
      description: "Protege tu hogar o negocio con cámaras de seguridad de alta calidad y monitoreo remoto."
    },
    {
      title: "Servicio Técnico con Delivery para Todos tus Dispositivos",
      imageSrc: "/static/images/service_06.webp",
      imageAlt: "Servicio Técnico con Delivery",
      description: "Reparación y mantenimiento de dispositivos con servicio de delivery para tu comodidad."
    }
  ];  

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
        className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-10 gap-y-10"
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
            description={item.description}
          />
        ))}
      </motion.section>
    </>
  )
}