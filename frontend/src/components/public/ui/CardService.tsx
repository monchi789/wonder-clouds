import Image from "next/image";
import Link from "next/link";

interface CardServiceProps {
  title: string;
  imageSrc: string;
  imageAlt: string;
  link: string
}

export default function CardService({
  title,
  imageSrc,
  imageAlt,
  link
}: CardServiceProps) {
  return (
    <Link href={link} className="flex flex-col shadow-custom-blue rounded-3xl rounded-bl-none px-10 py-10 transform transition-transform duration-300 hover:scale-105">
      <Image src={imageSrc} alt={imageAlt} width={150} height={150} />
      <h4 className="text-2xl font-semibold mt-auto">{title}</h4>
    </Link>
  );
}