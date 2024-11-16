import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";

interface ProjectCarouselProps {
  title: string;
  imageSrc: string;
  description: string;
  tags?: string[];
  link?: string;
}

const ProjectCarouselCard = ({
  title,
  imageSrc,
  description,
  tags = [],
  link = "#"
}: ProjectCarouselProps) => {
  return (
    <Link href={link}>
      <motion.div
        className="group relative flex flex-col w-full h-full overflow-hidden rounded-xl bg-white shadow-md hover:shadow-xl transition-shadow duration-300"
        whileHover={{ y: -5 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {/* Imagen con overlay en hover */}
        <div className="relative w-full h-56 overflow-hidden">
          <Image
            src={imageSrc}
            alt={title}
            fill
            className="object-cover transform group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* Contenido */}
        <div className="flex flex-col flex-grow p-5 space-y-3">
          <div className="space-y-2">
            <h3 className="text-xl font-bold text-gray-800 line-clamp-1">
              {title}
            </h3>
            <p className="text-gray-600 text-sm line-clamp-2">
              {description}
            </p>
          </div>

          {/* Tags */}
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-auto pt-3">
              {tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-2 py-1 text-xs font-medium bg-blue-100 text-primary rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Flecha indicadora de link */}
          <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <svg
              className="w-6 h-6 text-secondary"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

export default ProjectCarouselCard;