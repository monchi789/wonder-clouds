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
    <div className="w-full bg-white rounded shadow-md">
      <Image className="w-full" src={imageSrc} alt={title} width={1000} height={1000} layout="contain" />
      <h3 className="text-2xl font-semibold p-5">{title}</h3>
    </div>
  )
}

export default ProjectCarouselCard;