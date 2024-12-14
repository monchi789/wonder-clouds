// components/public/ui/ProjectCarousel.tsx

"use client";

import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, Navigation, Autoplay } from 'swiper/modules';
import ProjectCarouselCard from '../../components/ui/ProjectCarouselCard';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';

const projects = [
  {
    title: "Proyecto Paltos - Geragri",
    imageSrc: "/static/images/prueba.png",
    description: "",
    tags: ["Desarrollo de software", "Página web", "Responsive"]
  },
  {
    title: "CORLAD - Cusco",
    imageSrc: "/static/images/prueba2.png",
    description: "",
    tags: ["Plataforma web", "Dashboard", "Base de datos"]
  },
  {
    title: "AER. Athletic Club",
    imageSrc: "/static/images/prueba3.png",
    description: "",
    tags: ["Desarrollo de software", "Página web", "Responsive"]
  },
  {
    title: "Peruvian Cusco Travel",
    imageSrc: "/static/images/prueba4.png",
    description: "",
    tags: ["Desarrollo de software", "Página web", "Responsive"]
  }
];

const ProjectsCarousel = () => {
  return (
    <>
      <motion.h2
        className="text-3xl lg:text-4xl text-default font-semibold"
        initial={{ opacity: 0, y: 20 }} // Inicia transparente y un poco abajo
        whileInView={{ opacity: 1, y: 0 }} // Aparece y sube al estar en vista
        transition={{ duration: 0.6, ease: "easeOut" }} // Controla duración y suavidad
        viewport={{ once: true, amount: 0.2 }} // Animación solo una vez cuando esté 30% visible
      >
        Nuestro<span className="ps-2 text-primary">Trabajo</span>
      </motion.h2>

      <div className="w-full max-w-[1400px] mx-auto lg:px-8 mt-16">
        <Swiper
          effect={'coverflow'}
          grabCursor={true}
          centeredSlides={true}
          loop={true}
          slidesPerView={'auto'}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true
          }}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 100,
            modifier: 2.5,
          }}
          pagination={{
            el: '.swiper-pagination',
            clickable: true,
            dynamicBullets: true
          }}
          navigation={{
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          }}
          modules={[EffectCoverflow, Pagination, Navigation, Autoplay]}
          className="w-full py-8 sm:py-12"
        >
          {projects.map((project, index) => (
            <SwiperSlide key={index} className="!w-[300px] sm:!w-[340px] md:!w-[400px] lg:!w-[560px] rounded-lg">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                viewport={{ once: true, amount: 0.2 }}
              >
                <ProjectCarouselCard
                  title={project.title}
                  imageSrc={project.imageSrc}
                  description={project.description}
                  tags={project.tags}
                />
              </motion.div>
            </SwiperSlide>
          ))}

          <div className="relative mt-8 sm:mt-12">
            <div className="swiper-pagination !relative !bottom-0 !w-full flex justify-center gap-2"></div>
          </div>
        </Swiper>

        <style jsx global>{`
        .swiper-slide {
          transition: all 0.3s ease;
          height: auto !important;
        }

        .swiper-slide-active {
          transform: scale(1.05);
        }

        .swiper-pagination-bullet {
          width: 10px;
          height: 10px;
          background: #CBD5E1;
          opacity: 1;
          transition: all 0.3s ease;
        }

        .swiper-pagination-bullet-active {
          background: #104D7E;
          width: 24px;
          border-radius: 5px;
        }

        /* Responsive adjustments */
        @media (max-width: 640px) {
          .swiper-pagination-bullet {
            width: 8px;
            height: 8px;
          }

          .swiper-pagination-bullet-active {
            width: 20px;
          }
        }

        @media (min-width: 1024px) {
          .swiper-slide-active {
            transform: scale(1.08);
          }
        }
      `}</style>
      </div>
    </>
  );
};

export default ProjectsCarousel;