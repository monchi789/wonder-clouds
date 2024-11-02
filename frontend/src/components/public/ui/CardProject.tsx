import Image from "next/image"
import { Divider } from "./Dividers"

interface CardProjectProps {
  title: string;
  imageSrc: string;
  imageAlt: string;
  type: string;
  client: string;
  date: string;
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
    <article className="w-full bg-white shadow-md hover:shadow-lg transition-shadow duration-300 rounded-2xl overflow-hidden">
      {/* Image container with aspect ratio */}
      <div className="relative aspect-[4/3] w-full">
        <Image
          className="object-cover"
          src={imageSrc}
          alt={imageAlt}
          fill
          sizes="(max-width: 640px) 100vw, 
                 (max-width: 768px) 80vw,
                 (max-width: 1024px) 50vw,
                 33vw"
          priority
        />
      </div>

      <div className="flex flex-col p-4 sm:p-5 space-y-4">
        {/* Title */}
        <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 line-clamp-2">
          {title}
        </h3>

        {/* Project Type Badge */}
        <div className="flex flex-wrap gap-2">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs sm:text-sm bg-gray-200 text-gray-700 font-medium">
            {type}
          </span>
        </div>

        {/* Client Info */}
        <div className="flex items-center justify-between py-2 text-sm sm:text-base">
          <span className="font-semibold text-gray-700">Cliente</span>
          <span className="text-gray-600">{client}</span>
        </div>

        <Divider />

        {/* Date Info */}
        <div className="flex items-center justify-between py-2 text-sm sm:text-base">
          <span className="font-semibold text-gray-700">Fecha</span>
          <span className="text-gray-600">{date}</span>
        </div>
      </div>
    </article>
  )
}

export default CardProject