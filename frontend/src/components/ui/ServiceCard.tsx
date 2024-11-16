import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

interface ServiceProps {
  title: string;
  imageSrc: string;
  imageAlt: string;
  description?: string; // Descripción corta del servicio
  link: string;
  icon?: React.ReactNode; // Icono opcional
}

const ServiceCard = ({
  title,
  imageSrc,
  imageAlt,
  description,
  link,
  icon
}: ServiceProps) => {
  return (
    <Link href={link}>
      <motion.div
        className="group relative flex flex-col h-full bg-white/50 backdrop-blur-sm border border-blue-100 rounded-3xl rounded-bl-none p-6 sm:p-8 
                   shadow-[0_0_20px_rgba(59,130,246,0.15)] hover:shadow-[0_0_25px_rgba(59,130,246,0.25)]
                   transition-all duration-300"
        whileHover={{
          y: -8,
          transition: { duration: 0.3 }
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {/* Decorative gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-transparent rounded-3xl rounded-bl-none opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Content container */}
        <div className="relative z-10 flex flex-col h-full">
          {/* Icon/Image section with blue glow effect */}
          <div className="relative w-[150px] h-[150px] mx-auto mb-6">
            <div className="absolute inset-0 bg-blue-400/20 rounded-full filter blur-xl scale-90 group-hover:scale-110 transition-transform duration-300" />
            <Image
              src={imageSrc}
              alt={imageAlt}
              width={150}
              height={150}
              className="relative z-10 object-contain transition-transform duration-300 group-hover:scale-110"
            />
          </div>

          {/* Text content */}
          <div className="flex-grow mt-4">
            <h3 className="text-2xl font-bold text-gray-800 group-hover:text-secondary transition-colors duration-300 mb-3">
              {title}
            </h3>
            {description && (
              <p className="text-gray-600 text-sm line-clamp-2 transition-opacity duration-300 group-hover:text-gray-800">
                {description}
              </p>
            )}
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

export default ServiceCard;
