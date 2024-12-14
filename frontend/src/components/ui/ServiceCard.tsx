import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

interface ServiceProps {
  title: string;
  imageSrc: string;
  imageAlt: string;
  description?: string;
  link: string;
}

const ServiceCard = ({
  title,
  imageSrc,
  imageAlt,
  description,
  link
}: ServiceProps) => {
  return (
    <Link href={link} className="block">
      <motion.div
        className="group relative flex h-full 
          bg-white/80 backdrop-blur-sm 
          border border-blue-100/50 
          rounded-lg
          p-6 sm:p-8
          shadow-lg hover:shadow-2xl
          transition-all duration-300 
          hover:border-blue-200/70 min-h-[220px]"
        whileHover={{
          y: -10,
          scale: 1.025,
          transition: { 
            duration: 0.3,
            type: "spring",
            stiffness: 300
          }
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {/* Gradient Overlay */}
        <div 
          className="absolute inset-0 
          bg-gradient-to-br from-blue-50/30 to-transparent 
          opacity-0 group-hover:opacity-100 
          transition-opacity duration-400 
          pointer-events-none"
        />

        {/* Content Container */}
        <div className="relative z-10 flex w-full space-x-6">
          {/* Image Section */}
          <div className="relative w-24 h-24 flex-shrink-0">
            <div 
              className="absolute inset-0 
              bg-blue-400/10 rounded-xl 
              blur-xl scale-90 
              group-hover:scale-100 
              transition-all duration-400"
            />
            
            <Image
              src={imageSrc}
              alt={imageAlt}
              width={200}
              height={200}
              className="relative z-10 
              object-contain w-full h-full 
              transition-transform duration-400 
              group-hover:scale-110"
            />
          </div>

          {/* Text Content */}
          <div className="flex-grow">
            <h3 
              className="text-xl font-bold 
              text-gray-800 
              group-hover:text-blue-600 
              transition-colors duration-400 
              mb-2"
            >
              {title}
            </h3>
            
            {description && (
              <p 
                className="text-gray-600 
                text-sm 
                line-clamp-3 
                group-hover:text-gray-800 
                transition-colors duration-400"
              >
                {description}
              </p>
            )}
          </div>

          {/* Hover Indicator */}
          <div 
            className="self-start opacity-0 group-hover:opacity-100 
            transition-opacity duration-400"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="20" 
              height="20" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              className="text-blue-500 group-hover:translate-x-1 transition-transform"
            >
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

export default ServiceCard;