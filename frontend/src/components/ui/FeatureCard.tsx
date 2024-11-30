"use client"

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface FeatureCardProps {
  title: string;
  description: string;
  imageSrc: string;
  tags: string[];
  onClickMore?: () => void;
}

const FeatureCard = ({
  title,
  description,
  imageSrc,
  tags = [],
  onClickMore
}: FeatureCardProps) => {
  return (
    <motion.div
      className="relative bg-white rounded-3xl shadow-sm hover:shadow-md transition-shadow duration-300 p-6 "
      initial="initial"
      whileHover="hover"
      animate="initial"
    >
      <motion.div
        variants={{
          initial: { y: 0, marginBottom: 0 },
          hover: { y: 0, marginBottom: "2rem" }
        }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <div className="flex flex-col md:flex-row gap-6 items-center">
          {/* Content Section */}
          <div className="flex-1 space-y-3">
            <h2 className="text-2xl font-semibold text-gray-900">{title}</h2>
            <p className="text-gray-600 leading-relaxed">{description}</p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-4 py-1 bg-gray-100 text-gray-600 rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Image */}
          <div className="flex-shrink-0 w-full md:w-64">
            <Image
              src={imageSrc}
              alt={title}
              width={500}
              height={500}
              className="w-full h-auto object-contain"
            />
          </div>
        </div>
      </motion.div>

      {/* Button Section */}
      <motion.div
        variants={{
          initial: {
            height: 0,
            opacity: 0,
            marginTop: 0
          },
          hover: {
            height: "auto",
            opacity: 1,
            marginTop: "0.5rem"
          }
        }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="text-start overflow-hidden"
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="text-sm text-white font-semibold bg-primary hover:bg-secondary rounded-xl transition-colors duration-300 m-2 px-6 py-2 flex items-center"
          onClick={onClickMore}
        >
          Ver más
          <ArrowRight className="ml-2 w-4 h-4" /> 
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default FeatureCard;