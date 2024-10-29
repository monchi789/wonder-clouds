import Breadcrumb from "@/components/public/ui/Breadcrumb"


function Nosotros() {
  return (
    <>
      <div className="flex flex-col items-center mt-12">
        <h1 className="text-3xl lg:text-4xl font-semibold text-center">Nosotros</h1>
        <div className="mt-4">
          <Breadcrumb />
        </div>
      </div>
    </>
  )
}

export default Nosotros