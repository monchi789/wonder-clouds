import ProjectsList from "@/app/proyectos/components/ProjectsList"
import Breadcrumb from "@/components/ui/Breadcrumb"

const Proyectos = () => {
  return (
    <>
      <div className="flex flex-col items-center mt-12">
        <h1 className="text-3xl text-primary lg:text-5xl font-semibold text-center">Proyectos</h1>
        <div className="mt-4">
          <Breadcrumb />
        </div>
      </div>
      <ProjectsList />
      <div className="text-center my-16 bg-gradient-to-r from-primary/10 to-primary/5 p-8 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">¿Listo para impulsar tu próximo proyecto?</h2>
        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
          Nos encantaría colaborar contigo para llevar tu idea al siguiente nivel. Nuestro equipo está listo para crear soluciones innovadoras que marquen la diferencia.
        </p>
        <button className="bg-primary text-white px-6 py-3 rounded-md hover:bg-primary/90 transition-colors">
          Contactanos
        </button>
      </div>
    </>
  )
}

export default Proyectos