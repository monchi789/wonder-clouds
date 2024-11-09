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
    <motion.div
      className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-x-20 gap-y-10 mt-16 max-w-6xl p-5"
      initial="hidden"
      whileInView="visible"
      variants={fadeInUp}
      transition={{ duration: 0.5, delay: 0.6 }}
    >
      <TeamCard
        name="Jayo Baez"
        role="Especialista en Marketing Digital"
        imageSrc="/static/images/team/JayoBaez.webp"
        githubUrl="https://github.com/"
        instagramUrl="https://www.instagram.com/"
        linkedinUrl="https://www.linkedin.com/"
      />
      <TeamCard
        name="Christian Monzon"
        role="Desarrollador de software"
        imageSrc="/static/logos/wonder.webp"
        githubUrl="https://github.com/"
        instagramUrl="https://www.instagram.com/"
        linkedinUrl="https://www.linkedin.com/"
      />
      <TeamCard
        name="Sergio Salazar"
        role="Desarrollador de software"
        imageSrc="/static/logos/wonder.webp"
        githubUrl="https://github.com/"
        instagramUrl="https://www.instagram.com/"
        linkedinUrl="https://www.linkedin.com/"
      />
      <TeamCard
        name="Robby Villano"
        role="Desarrollador de software"
        imageSrc="/static/logos/wonder.webp"
        githubUrl="https://github.com/"
        instagramUrl="https://www.instagram.com/"
        linkedinUrl="https://www.linkedin.com/"
      />
      <TeamCard
        name="Andrés Tejada"
        role="Especialista en base de datos"
        imageSrc="/static/logos/wonder.webp"
        githubUrl="https://github.com/"
        instagramUrl="https://www.instagram.com/"
        linkedinUrl="https://www.linkedin.com/"
      />
      <TeamCard
        name="Leslie Vargas"
        role="Diseñadora web"
        imageSrc="/static/logos/wonder.webp"
        githubUrl="https://github.com/"
        instagramUrl="https://www.instagram.com/"
        linkedinUrl="https://www.linkedin.com/"
      />
      <TeamCard
        name="Kiara Oquendo"
        role="Diseñadora de contenidos"
        imageSrc="/static/logos/wonder.webp"
        githubUrl="https://github.com/"
        instagramUrl="https://www.instagram.com/"
        linkedinUrl="https://www.linkedin.com/"
      />

    </motion.div>
  )
}

export default Team;