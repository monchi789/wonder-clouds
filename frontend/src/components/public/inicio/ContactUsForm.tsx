import Image from "next/image"
import { Button } from "@nextui-org/button"
import { Input } from "@nextui-org/input"
import { MailIcon, Phone, Send, User } from "lucide-react"

const ContactUsForm = () => {
  return (
    <div className="container flex flex-col w-full lg:w-3/4 mx-auto items-center mt-12 lg:mt-24">
      <h2 className="text-3xl text-default lg:text-4xl font-semibold">
        <span className="text-primary">Comunícate</span> con nosotros
      </h2>
      <div className="flex flex-row mx-12 justify-center space-x-10">
        <Image className="hidden lg:block w-1/2" src="/static/images/info.svg" width={500} height={500} alt="Imagen representativa" />
        <div className="w-1/2 flex flex-col text-default my-auto">
          <span className="text-medium font-semibold">¿Necesitas soluciones digitales?</span>
          <span className="text-3xl lg:text-4xl font-semibold mb-5">No dudes en contactarnos</span>
          <div className="flex flex-col space-y-10">
            <Input
              type="text"
              variant="underlined"
              placeholder="Nombre"
              startContent={
                <User className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
              }
            />

            <Input
              type="email"
              variant="underlined"
              placeholder="Correo"
              startContent={
                <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
              }
            />

            <Input
              type="number"
              variant="underlined"
              placeholder="Teléfono"
              startContent={
                <Phone className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
              }
            />

            <Button className="bg-[#104D7E] text-white text-base rounded-lg mx-auto p-5 " startContent={<Send />}>Enviar</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactUsForm;