"use client"

import Image from "next/image";
import { Button } from "@nextui-org/button";
import { Input, Textarea } from "@nextui-org/input";
import { MailIcon, Phone, Send, User, MessageCircle } from "lucide-react";
import { motion } from 'framer-motion';

const ContactUsForm = () => {
  return (
    <div className="max-w-7xl px-4 sm:px-6 lg:px-8 mx-auto">
      <div className="flex flex-col py-8 sm:py-12">
        <motion.div
          className="flex items-center mx-auto gap-3 mb-6"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl lg:text-4xl text-default font-semibold text-center">
          Comunícate con<span className="ps-2 text-primary">Nosotros</span>
          </h2>
        </motion.div>

        <div className="w-full flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 lg:gap-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.2 }}
            className="hidden lg:block lg:w-1/2"
          >
            <motion.div
              animate={{
                y: [-10, 10, -10],
                rotate: [-2, 2, -2],
              }}
              transition={{
                duration: 4,
                ease: "easeInOut",
                repeat: Infinity,
                repeatType: "reverse"
              }}
            >
              <motion.div
                whileInView={{
                  scale: [1, 1.02, 1],
                  transition: {
                    duration: 2,
                    ease: "easeInOut",
                    repeat: Infinity
                  }
                }}
              >
                <Image
                  className="w-full h-auto max-w-2xl mx-auto"
                  src="/static/images/plane.webp"
                  width={1400}
                  height={1400}
                  alt="Imagen representativa"
                  priority
                />
              </motion.div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.2 }}
            className="w-full lg:w-1/2 max-w-md mx-auto lg:max-w-none rounded-2xl bg-gray-100 bg-opacity-40 p-10"
          >
            <div className="text-default mb-6 sm:mb-8">
              <h3 className="text-lg font-semibold mb-2 text-primary">¿Necesitas soluciones digitales?</h3>
              <p className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-primary">No dudes en contactarnos</p>
              <p className="text-lg sm:text-xl text-gray-600 mt-4">
                Estamos aquí para ayudarte con cualquier pregunta o solicitud que tengas. Nuestro equipo de expertos está listo para brindarte las mejores soluciones. ¡Esperamos tu mensaje!
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
                  variant="flat"
                  placeholder="Nombre"
                  classNames={{
                    input: "text-lg sm:text-xl",
                    inputWrapper: "h-14"
                  }}
                  startContent={
                    <User className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
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
                  variant="flat"
                  placeholder="Correo electrónico"
                  classNames={{
                    input: "text-lg sm:text-xl",
                    inputWrapper: "h-14"
                  }}
                  startContent={
                    <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
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
                  variant="flat"
                  placeholder="Teléfono"
                  classNames={{
                    input: "text-lg sm:text-xl",
                    inputWrapper: "h-14"
                  }}
                  startContent={
                    <Phone className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                  }
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                viewport={{ once: true, amount: 0.2 }}
              >
                <Textarea
                  variant="flat"
                  labelPlacement="outside"
                  placeholder="Envíanos un mensaje"
                  classNames={{
                    input: "text-lg sm:text-xl",
                    inputWrapper: "h-14"
                  }}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.4, ease: "easeOut" }}
                viewport={{ once: true, amount: 0.2 }}
              >
                <Button
                  className="bg-primary text-white w-full sm:w-auto sm:self-center px-8 py-4 text-lg sm:text-xl rounded-lg hover:opacity-90 transition-opacity focus:ring-2 focus:ring-primary"
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
