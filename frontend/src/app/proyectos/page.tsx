import ProjectsList from "@/app/proyectos/components/ProjectsList"
import Breadcrumb from "@/components/ui/Breadcrumb"
import ProjectsTitle from "./components/ProjectsTitle"

const Proyectos = () => {
  return (
    <>
      <ProjectsTitle/>
      <ProjectsList />
      <div className="text-center bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg my-16 p-8">
        <h2 className="text-3xl font-semibold mb-4">¿Listo para impulsar tu próximo proyecto?</h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-6">
          Nos encantaría colaborar contigo para llevar tu idea al siguiente nivel. Nuestro equipo está listo para crear soluciones innovadoras que marquen la diferencia.
        </p>
        <button className="bg-primary text-white font-semibold font-quicksand px-6 py-3 rounded-md hover:bg-primary/90 transition-colors">
          Contáctanos
        </button>
      </div>
    </>
  )
}

export default Proyectos