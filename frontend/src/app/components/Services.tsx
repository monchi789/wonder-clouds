"use client"

import ServiceCard from "@/components/ui/ServiceCard";
import { motion } from 'framer-motion';
import { Star, CheckCircle } from 'lucide-react';

export default function Services() {
  const services = [
    {
      title: "Desarrollo de Software a Medida",
      imageSrc: "/static/images/service_03.svg",
      imageAlt: "Desarrollo de Software",
      description: "Soluciones tecnológicas completamente personalizadas que se adaptan perfectamente a las necesidades específicas de tu negocio, aumentando la eficiencia y la productividad.",
    },
    {
      title: "Desarrollo de Aplicaciones Móviles",
      imageSrc: "/static/images/service_06.webp",
      imageAlt: "Aplicaciones Móviles Multiplataforma",
      description: "Creamos aplicaciones móviles innovadoras e intuitivas para iOS y Android, diseñadas para expandir tu alcance digital y mejorar la experiencia de tus usuarios.",
    },
    {
      title: "Desarrollo de Sitios Web",
      imageSrc: "/static/images/service_02.webp",
      imageAlt: "Desarrollo de Páginas Web",
      description: "Diseñamos sitios web modernos, responsivos y optimizados para SEO que no solo capturan la esencia de tu marca, sino que también convierten visitantes en clientes.",
    },
    {
      title: "Estrategias de Marketing Digital",
      imageSrc: "/static/images/service_01.svg",
      imageAlt: "Marketing Digital",
      description: "Desarrollamos estrategias de marketing digital integrales que aumentan tu visibilidad online, generan leads de calidad y impulsan el crecimiento de tu negocio.",
    },
    {
      title: "Integración de Chatbots",
      imageSrc: "/static/images/service_04.webp",
      imageAlt: "Chatbots Personalizados",
      description: "Implementamos chatbots con inteligencia artificial que automatizan la atención al cliente, mejoran la experiencia de usuario y aumentan la eficiencia de tu servicio.",
    },
    {
      title: "Diseño UX/UI",
      imageSrc: "/static/images/service_05.webp",
      imageAlt: "Diseño UX/UI",
      description: "Creamos interfaces de usuario innovadoras y experiencias de usuario excepcionales que conectan emocionalmente con tus usuarios y mejoran la interacción con tu producto.",
    }
  ];

  // Staggered animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <motion.div
        className="mb-12 flex items-center gap-3"
        initial={{ opacity: 0, x: -20 }} 
        whileInView={{ opacity: 1, x: 0 }} 
        transition={{ duration: 0.6, ease: "easeOut" }} 
        viewport={{ once: true }}
      >
        <div className="w-1 h-8 bg-primary"></div>
        <h2 className="text-3xl lg:text-4xl text-default font-semibold text-start">
          Nuestros <span className="text-primary">Servicios</span>
        </h2>
      </motion.div>
      
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        {services.map((item, index) => (
          <motion.div 
            key={index} 
            variants={itemVariants}
            className="w-full group"
          >
            <div className="relative">
              <ServiceCard
                link=""
                title={item.title}
                imageSrc={item.imageSrc}
                imageAlt={item.imageAlt}
                description={item.description}
              />
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Decorative elements */}
      <div className="absolute left-0 right-0 -z-10 opacity-10">
        <div className="absolute top-0 left-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>
      </div>
    </div>
  )
}