//components/public/nosotros/Team.tsx

"use client"

import TeamCard from "@/components/public/ui/TeamCard";
import { motion } from "framer-motion";

const Team = () => {

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-x-10 gap-y-10 mt-12 p-5 max-w-6xl"
      initial="hidden"
      whileInView="visible"
      variants={fadeInUp}
      transition={{ duration: 0.5, delay: 0.6 }}
    >
      <TeamCard
        name="Jayo Baez"
        role="Especialista en Marketing Digital"
        imageSrc="/static/images/wonder.png"
        githubUrl="https://github.com/"
        instagramUrl="https://www.instagram.com/"
        linkedinUrl="https://www.linkedin.com/"
      />
      <TeamCard
        name="Christian Monzon"
        role="Desarrollador de software"
        imageSrc="/static/images/wonder.png"
        githubUrl="https://github.com/"
        instagramUrl="https://www.instagram.com/"
        linkedinUrl="https://www.linkedin.com/"
      />
      <TeamCard
        name="Sergio Salazar"
        role="Desarrollador de software"
        imageSrc="/static/images/wonder.png"
        githubUrl="https://github.com/"
        instagramUrl="https://www.instagram.com/"
        linkedinUrl="https://www.linkedin.com/"
      />
      <TeamCard
        name="Robby"
        role="Especialista en Marketing Digital"
        imageSrc="/static/images/wonder.png"
        githubUrl="https://github.com/"
        instagramUrl="https://www.instagram.com/"
        linkedinUrl="https://www.linkedin.com/"
      />
      <TeamCard
        name="Andrés Tejada"
        role="Desarrollador de software"
        imageSrc="/static/images/wonder.png"
        githubUrl="https://github.com/"
        instagramUrl="https://www.instagram.com/"
        linkedinUrl="https://www.linkedin.com/"
      />
      <TeamCard
        name="Leslie"
        role="Desarrollador de software"
        imageSrc="/static/images/wonder.png"
        githubUrl="https://github.com/"
        instagramUrl="https://www.instagram.com/"
        linkedinUrl="https://www.linkedin.com/"
      />
      <TeamCard
        name="Kiara"
        role="Desarrollador de software"
        imageSrc="/static/images/wonder.png"
        githubUrl="https://github.com/"
        instagramUrl="https://www.instagram.com/"
        linkedinUrl="https://www.linkedin.com/"
      />

    </motion.div>
  )
}

export default Team;