// components/ProjectCarousel.js
"use client"; // Add this for Client Component

import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, Navigation, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';

import CardSliderProject from '../ui/CardSliderProject';

const OurProjects = () => {
  return (
    <>
      <Swiper
        effect={'coverflow'}
        centeredSlides={true}
        loop={true}
        slidesPerView={'auto'}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false, // Continúa el autoplay incluso después de interacción manual
          pauseOnMouseEnter: true, // Opcional: pausa cuando el mouse está encima
        }}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 100,
          modifier: 2.5,
        }}
        pagination={{ el: '.swiper-pagination', clickable: true }}
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }}
        modules={[EffectCoverflow, Pagination, Navigation, Autoplay]}
        className="swiper_container mt-12"
      >
        <SwiperSlide>
          <CardSliderProject title="Proyecto Paltos - Geragri" imageSrc={"/static/images/prueba.png"} />
        </SwiperSlide>
        <SwiperSlide>
          <CardSliderProject title="CORLAD - Cusco" imageSrc={"/static/images/prueba2.png"} />
        </SwiperSlide>
        <SwiperSlide>
          <CardSliderProject title="AER. Athletic Club" imageSrc={"/static/images/prueba3.png"} />
        </SwiperSlide>
        <SwiperSlide>
          <CardSliderProject title="Peruvian Cusco Travel" imageSrc={"/static/images/prueba4.png"} />
        </SwiperSlide>

        <div className="slider-controler">
          <div className="swiper-pagination"></div>
        </div>
      </Swiper>
      <style jsx global>
        {`
          .swiper_container {
            height: 30rem;
            padding: 2rem 0;
            position: relative;
          }

          .swiper-slide {
            width: 35rem;
            height: 35rem;
            position: relative;
          }

          @media (max-width: 500px) {
            .swiper_container {
              height: 30rem;
            }
            .swiper-slide {
              width: 28rem !important;
              height: 36rem !important;
            }
          }

          .swiper-slide-shadow-left,
          .swiper-slide-shadow-right {
            display: none;
          }

          .slider-controler {
            position: relative;
            bottom: 3rem;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .swiper-pagination {
            position: relative;
            width: 15rem !important;
            bottom: 1rem;
          }

          .swiper-pagination .swiper-pagination-bullet {
            filter: drop-shadow(0px 8px 24px rgba(18, 28, 53, 0.1));
          }

          .swiper-pagination .swiper-pagination-bullet-active {
            background: #000000;
          }
        `}
      </style>
    </>
  );
};

export default OurProjects;
