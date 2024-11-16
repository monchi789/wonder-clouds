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
    </>
  )
}

export default Proyectos