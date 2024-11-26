import Title from "@/shared/components/common/Title";



const ProductsMain = () => { 
  return (
    <>
    <Title
      title='Productos'
      description='Aqui puedes gestionar todos tus productos recientes y administrar su contenido.'
      buttonName='Crear Nuevo Producto'
      link='/products/new'
    />
  </>
  );
}


export default ProductsMain;
