import Title from '@/shared/components/common/Title'
import GeneralTypeCard from '../components/GeneralTypeCard'

const GeneralTypeMain = () => {
  return (
    <>
      <Title
        title='Tipos Generales'
        description='Aquí puedes gestionar todos los tipos generales.'
      />

      <div className='mt-6'>
        <GeneralTypeCard title='xd' description='xd' type={''} />
      </div>
    </>
  )
}

export default GeneralTypeMain
