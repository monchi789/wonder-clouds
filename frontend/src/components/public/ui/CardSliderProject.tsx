import Image from "next/image";

interface CardSliderProjectProps {
  title: string
  imageSrc: string
}

const CardSliderProject = ({
  title,
  imageSrc
}:  CardSliderProjectProps) => {
  return (
    <div className="w-full bg-white rounded shadow-md">
      <Image className="w-full" src={imageSrc} alt={title} width={1000} height={1000} layout="contain" />
      <h4 className="text-2xl font-semibold p-5">{title}</h4>
    </div>
  )
}

export default CardSliderProject;