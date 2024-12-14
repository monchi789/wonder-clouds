//components/public/contactanos/ContactTitle.tsx

"use client"

import { motion } from "framer-motion"; // Importa motion
import Breadcrumb from "@/components/ui/Breadcrumb";

const ContactTitle = () => {

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <>
      <motion.div
        className="flex flex-col items-center py-12"
        initial="hidden"
        whileInView="visible"
        variants={fadeIn}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-5xl lg:text-6xl text-center text-primary font-bold ">
          Contáctanos
        </h1>
        <div className="mt-4">
          <Breadcrumb colorText="text-default" />
        </div>
      </motion.div>
    </>
  )
}

export default ContactTitle;