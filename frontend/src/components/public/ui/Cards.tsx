import { Github } from "lucide-react";
import Image from "next/image";
import { CiLinkedin } from "react-icons/ci";
import { IoLogoInstagram } from "react-icons/io";

interface CardServicesProps {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  bgColor?: string;
  borderColor?: string;
  textColor?: string;
}

interface CardTeamProps {
  name: string;
  role: string;
  imageSrc: string;
  linkedinUrl: string;
  githubUrl: string;
  instagramUrl: string;
}

function CardServices({
  title,
  description,
  imageSrc,
  imageAlt,
  bgColor = "#FBE5D1", // Color de fondo por defecto
  borderColor = "#CD7109", // Color del borde por defecto y fondo de la imagen
}: CardServicesProps) {
  return (
    <div
      className="relative w-full border-2 rounded-3xl p-6 shadow-md"
      style={{ backgroundColor: bgColor, borderColor: borderColor }}
    >
      <div
        className="absolute top-1/2 left-1 transform -translate-x-1/2 -translate-y-1/2 rounded-full p-3"
        style={{ backgroundColor: borderColor }}
      >
        <img src={imageSrc} alt={imageAlt} />
      </div>
      <div className="flex-1 ps-10">
        <h2 className={`text-xl font-bold mb-2 text-black`}>{title}</h2>
        <p className="text-black">{description}</p>
      </div>
    </div>
  );
}

function CardTeam({
  name,
  role,
  imageSrc, 
  linkedinUrl, 
  githubUrl, 
  instagramUrl 
}: CardTeamProps) {
  return (
    <div className="flex flex-col text-color">
      <Image className="w-full max-h-80 object-contain" src={imageSrc} width={250} height={250} alt={name} />
      <span className="text-xl text-color font-semibold mt-3">{name}</span>
      <span className="text-medium text-[#9EA1ADEE]">{role}</span>
      <div className="flex flex-row space-x-2 mt-1">
        {linkedinUrl && (
          <a href={linkedinUrl} target="_blank" rel="noopener noreferrer">
            <CiLinkedin size={25} />
          </a>
        )}
        {githubUrl && (
          <a href={githubUrl} target="_blank" rel="noopener noreferrer">
            <Github size={25} />
          </a>
        )}
        {instagramUrl && (
          <a href={instagramUrl} target="_blank" rel="noopener noreferrer">
            <IoLogoInstagram size={25} />
          </a>
        )}
      </div>
    </div>
  );
}


export {CardServices, CardTeam};