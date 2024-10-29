import Image from "next/image"
import { Divider } from "./Dividers"

interface CardProjectProps {
  title: string,
  imageSrc: string,
  imageAlt: string,
  type: string,
  client: string,
  date: string
}

const CardProject = ({
  title,
  imageSrc,
  imageAlt,
  type,
  client,
  date
}: CardProjectProps) => {
  return (
    <div className="w-[400px] bg-white shadow-md rounded-2xl">
      <Image className="w-[400px] h-[200px] object-cover rounded-t-2xl" src={imageSrc} alt={imageAlt} width={500} height={500} />
      <div className="flex flex-col px-5 pt-3">
        <span className="text-lg font-bold">{title}</span>
        <span className="text-sm">{type}</span>
        <div className="flex flex-row justify-between py-5">
          <span className="font-semibold">Cliente</span>
          <span>{client}</span>
        </div>
        <Divider />
        <div className="flex flex-row justify-between py-5">
          <span className="font-semibold">Fecha</span>
          <span>{date}</span>
        </div>
      </div>
    </div>
  )
}

export default CardProject