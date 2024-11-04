import Image from "next/image";

interface ProjectCarouselProps {
  title: string
  imageSrc: string
}

const ProjectCarouselCard = ({
  title,
  imageSrc
}: ProjectCarouselProps) => {
  return (
    <div className="relative flex flex-col w-full h-full mx-auto overflow-hidden rounded-lg shadow-lg bg-white">
      <div className="relative w-full h-48 sm:h-56">
        <Image
          src={imageSrc}
          alt={title}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 truncate">
          {title}
        </h3>
      </div>
    </div>
  );
};

export default ProjectCarouselCard;