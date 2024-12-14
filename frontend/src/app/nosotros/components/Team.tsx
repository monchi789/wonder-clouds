//components/public/nosotros/Team.tsx

"use client"

import TeamCard from "@/components/ui/TeamCard";
import { motion } from "framer-motion";

const Team = () => {

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="w-full bg-background-light pb-20">
      <motion.div
        className="flex flex-col w-full max-w-7xl items-center relative space-y-20 mx-auto "
        initial="hidden"
        whileInView="visible"
        variants={fadeInUp}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <motion.h2
          className="text-3xl lg:text-5xl text-default font-semibold font-monserrat"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.2 }}
        >
          Nuestro <span className="text-primary">Equipo</span>
        </motion.h2>

        <motion.div
          className="flex flex-row max-w-6xl space-x-10"
          initial="hidden"
          whileInView="visible"
          variants={fadeInUp}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <motion.h3
            className="text-3xl lg:text-4xl text-default font-semibold font-monserrat"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.2 }}
          >
            Los <span className="text-primary">Mejores</span>
          </motion.h3>

          <motion.p
            className="w-2/3 text-lg text-default font-medium font-quicksand"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.2 }}
          >
            En WonderClouds, nuestro equipo está compuesto por los mejores en soluciones digitales.
            Estamos comprometidos a impulsar tu marca hacia el éxito con creatividad, experiencia y dedicación incomparables.
          </motion.p>
        </motion.div>

        <motion.div
          className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-x-20 gap-y-10 mt-16 max-w-6xl p-5"
          initial="hidden"
          whileInView="visible"
          variants={fadeInUp}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <TeamCard
            name="Jayo Baez"
            role="CEO"
            imageSrc="/static/images/team/jayo.webp"
            githubUrl="https://github.com/"
            instagramUrl="https://www.instagram.com/"
            linkedinUrl="https://www.linkedin.com/"
          />
          <TeamCard
            name="Cristian Monzon"
            role="Desarrollador de software"
            imageSrc="/static/images/team/monchi.webp"
            githubUrl="https://github.com/"
            instagramUrl="https://www.instagram.com/"
            linkedinUrl="https://www.linkedin.com/"
          />
          <TeamCard
            name="Sergio Salazar"
            role="Desarrollador de software"
            imageSrc="/static/images/team/sergis.webp"
            githubUrl="https://github.com/"
            instagramUrl="https://www.instagram.com/"
            linkedinUrl="https://www.linkedin.com/"
          />
          <TeamCard
            name="Robby Villano"
            role="Desarrollador de software"
            imageSrc="/static/images/team/robby.webp"
            githubUrl="https://github.com/"
            instagramUrl="https://www.instagram.com/"
            linkedinUrl="https://www.linkedin.com/"
          />
          <TeamCard
            name="Andrés Tejada"
            role="Desarrollador de software"
            imageSrc="/static/images/team/andres.webp"
            githubUrl="https://github.com/"
            instagramUrl="https://www.instagram.com/"
            linkedinUrl="https://www.linkedin.com/"
          />
          <TeamCard
            name="Kiara Oquendo"
            role="Especialista en Marketing Digital"
            imageSrc="/static/images/team/kiara.webp"
            githubUrl="https://github.com/"
            instagramUrl="https://www.instagram.com/"
            linkedinUrl="https://www.linkedin.com/"
          />
          <TeamCard
            name="Leslie Vargas"
            role="Diseñadora UX/UI"
            imageSrc="/static/images/team/leslie.webp"
            githubUrl="https://github.com/"
            instagramUrl="https://www.instagram.com/"
            linkedinUrl="https://www.linkedin.com/"
          />
          <TeamCard
            name="Victor Álvarez"
            role="Administrador de sistema de redes"
            imageSrc="/static/images/team/victor.webp"
            githubUrl="https://github.com/"
            instagramUrl="https://www.instagram.com/"
            linkedinUrl="https://www.linkedin.com/"
          />

        </motion.div>
      </motion.div>
    </div>
  )
}

export default Team;