import Title from '@/shared/components/common/Title'
import PostsCard from '../components/PostCard'

const ClientsMain = () => {
  return (
    <>
      <Title
        title='Publicaciones'
        description='Aquí puedes gestionar todas tus publicaciones recientes y administrar su contenido.'
        buttonName='Crear Nueva Publicación'
        link='/posts/new'
      />

      <div className='mt-6'>
        <PostsCard title='xd' portada='xd' date='asd' />
      </div>
    </>
  )
}

export default ClientsMain
