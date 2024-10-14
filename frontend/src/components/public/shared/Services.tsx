import React from 'react'
import { CardServices } from '../ui/Cards'

function Services() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-10 w-full">
      <CardServices
        title="Páginas web"
        description="Desde diseños elegantes hasta funcionalidades avanzadas, creamos sitios web a medida que no solo cautivan a tus visitantes, sino que también potencian tus objetivos comerciales."
        imageSrc="/static/images/services_01.svg"
        imageAlt="Desarrollo Web"
      />
      <CardServices
        title="Marketing digital"
        description="Desde diseños elegantes hasta funcionalidades avanzadas, creamos sitios web a medida que no solo cautivan a tus visitantes, sino que también potencian tus objetivos comerciales."
        imageSrc="/static/images/services_01.svg"
        imageAlt="Desarrollo Web"
        bgColor = "#E9DFFB"
        borderColor = "#3E0B73"
      />
      <CardServices
        title="Desarrollo de software a medida"
        description="Desde diseños elegantes hasta funcionalidades avanzadas, creamos sitios web a medida que no solo cautivan a tus visitantes, sino que también potencian tus objetivos comerciales."
        imageSrc="/static/images/services_01.svg"
        imageAlt="Desarrollo Web"
        bgColor = "#E9DFFB"
        borderColor = "#3E0B73"
      />
      <CardServices
        title="Gestión de redes sociales"
        description="Desde diseños elegantes hasta funcionalidades avanzadas, creamos sitios web a medida que no solo cautivan a tus visitantes, sino que también potencian tus objetivos comerciales."
        imageSrc="/static/images/services_01.svg"
        imageAlt="Desarrollo Web"
      />
      <CardServices
        title="Diseño gráfico"
        description="Desde diseños elegantes hasta funcionalidades avanzadas, creamos sitios web a medida que no solo cautivan a tus visitantes, sino que también potencian tus objetivos comerciales."
        imageSrc="/static/images/services_01.svg"
        imageAlt="Desarrollo Web"
      />
      <CardServices
        title="Asistente virtual personalizado"
        description="Desde diseños elegantes hasta funcionalidades avanzadas, creamos sitios web a medida que no solo cautivan a tus visitantes, sino que también potencian tus objetivos comerciales."
        imageSrc="/static/images/services_01.svg"
        imageAlt="Desarrollo Web"
        bgColor = "#E9DFFB"
        borderColor = "#3E0B73"
      />
    </div>
  )
}

export default Services