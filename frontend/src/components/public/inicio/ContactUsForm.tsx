
"use client"

import Image from "next/image";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { MailIcon, Phone, Send, User } from "lucide-react";
import { motion } from 'framer-motion';

const ContactUsForm = () => {
  return (
    <div className="container px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl">
      <div className="flex flex-col items-center py-8 sm:py-12 lg:py-16">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.2 }}
          className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-center mb-8 sm:mb-12"
        >
          <span className="text-primary">Comunícate</span> con nosotros
        </motion.h2>

        <div className="w-full flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 lg:gap-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.2 }}
            className="hidden lg:block lg:w-1/2"
          >
            <Image
              className="w-full h-auto max-w-lg mx-auto"
              src="/static/images/info.svg"
              width={800}
              height={800}
              alt="Imagen representativa"
              priority
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.2 }}
            className="w-full lg:w-1/2 max-w-md mx-auto lg:max-w-none"
          >
            <div className="text-default mb-6 sm:mb-8">
              <h3 className="text-base sm:text-lg font-semibold mb-2">
                ¿Necesitas soluciones digitales?
              </h3>
              <p className="text-2xl sm:text-3xl lg:text-4xl font-semibold">
                No dudes en contactarnos
              </p>
            </div>

            <div className="flex flex-col space-y-6 sm:space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                viewport={{ once: true, amount: 0.2 }}
              >
                <Input
                  type="text"
                  variant="underlined"
                  placeholder="Nombre"
                  classNames={{
                    input: "text-base sm:text-lg",
                    inputWrapper: "h-12"
                  }}
                  startContent={
                    <User className="text-xl sm:text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                  }
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                viewport={{ once: true, amount: 0.2 }}
              >
                <Input
                  type="email"
                  variant="underlined"
                  placeholder="Correo"
                  classNames={{
                    input: "text-base sm:text-lg",
                    inputWrapper: "h-12"
                  }}
                  startContent={
                    <MailIcon className="text-xl sm:text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                  }
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.0, ease: "easeOut" }}
                viewport={{ once: true, amount: 0.2 }}
              >
                <Input
                  type="tel"
                  variant="underlined"
                  placeholder="Teléfono"
                  classNames={{
                    input: "text-base sm:text-lg",
                    inputWrapper: "h-12"
                  }}
                  startContent={
                    <Phone className="text-xl sm:text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                  }
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                viewport={{ once: true, amount: 0.2 }}
              >
                <Button
                  className="bg-[#104D7E] text-white w-full sm:w-auto sm:self-center px-8 py-6 text-base sm:text-lg rounded-lg hover:opacity-90 transition-opacity"
                  startContent={<Send className="h-5 w-5" />}
                >
                  Enviar
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ContactUsForm;
