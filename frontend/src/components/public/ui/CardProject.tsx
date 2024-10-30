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
    <div className="w-full max-w-[350px] sm:max-w-[400px] md:max-w-[500px] bg-white shadow-md rounded-2xl mx-auto">
      <Image
        className="w-full h-[200px] sm:h-[250px] md:h-[300px] object-cover rounded-t-2xl"
        src={imageSrc}
        alt={imageAlt}
        width={500}
        height={500}
      />
      <div className="flex flex-col px-4 pt-3">
        <span className="text-base sm:text-lg md:text-xl font-bold">{title}</span>
        <span className="bg-gray-200 text-gray-700 text-xs md:text-sm rounded-full me-auto mt-2 px-3 py-1">{type}</span>
        <div className="flex flex-row justify-between py-4 md:py-5">
          <span className="font-semibold">Cliente</span>
          <span>{client}</span>
        </div>
        <Divider />
        <div className="flex flex-row justify-between py-4 md:py-5">
          <span className="font-semibold">Fecha</span>
          <span>{date}</span>
        </div>
      </div>
    </div>

  )
}

export default CardProject