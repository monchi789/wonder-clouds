interface CardServicesProps {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  bgColor?: string;
  borderColor?: string;
  textColor?: string;
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

export default CardServices;