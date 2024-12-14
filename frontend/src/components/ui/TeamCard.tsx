import { Github } from "lucide-react";
import Image from "next/image";
import { CiLinkedin } from "react-icons/ci";
import { IoLogoInstagram } from "react-icons/io";

interface TeamCardProps {
  name: string;
  role: string;
  imageSrc: string;
  linkedinUrl?: string;
  githubUrl?: string;
  instagramUrl?: string;
}

const TeamCard = ({
  name,
  role,
  imageSrc, 
  linkedinUrl, 
  githubUrl, 
  instagramUrl 
}: TeamCardProps) => {
  return (
    <div className="flex flex-col text-color font-quicksand">
      <Image className="w-full max-h-80 object-cover rounded-2xl" src={imageSrc} width={800} height={800} alt={name} />
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

export default TeamCard;