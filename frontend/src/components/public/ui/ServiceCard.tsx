import Image from "next/image";
import Link from "next/link";

interface ServiceProps {
  title: string;
  imageSrc: string;
  imageAlt: string;
  link: string
}

const ServiceCard = ({
  title,
  imageSrc,
  imageAlt,
  link
}: ServiceProps) => {
  return (
    <Link href={link} className="flex flex-col shadow-custom-blue rounded-3xl rounded-bl-none px-10 py-10 transform transition-transform duration-300 hover:scale-105">
      <Image src={imageSrc} alt={imageAlt} width={150} height={150} />
      <h3 className="text-2xl text-default font-semibold mt-auto">{title}</h3>
    </Link>
  );
}

export default ServiceCard;