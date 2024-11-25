import { Link } from 'react-router-dom';
import { Button } from '@/shared/components/ui/button'; // Importando el componente Button de Shadcn

interface TitleProps {
  title: string;
  description: string;
  buttonName?: string;
  link?: string;
}

const Title = ({ title, description, buttonName = '', link = '' }: TitleProps) => {
  return (
    <div className='flex flex-row justify-between bg-gradient-to-r from-wonder-blue to-wonder shadow-lg rounded-lg overflow-hidden border-b border-gray-200 px-6 py-4'>
      <div>
        <div className='flex items-center space-x-3'>
          <h2 className='text-3xl font-semibold text-white'>{title}</h2>
        </div>
        <p className='text-gray-100 text-sm mt-2'>{description}</p>
      </div>

      {buttonName ? (
        <Link to={link} className=''>
          <Button className='bg-wonder-blue text-white hover:bg-cyan-950 rounded-md shadow-md transition duration-300 ease-in-out transform hover:scale-105 active:scale-95 mt-4 px-6 py-2'>
            {buttonName}
          </Button>
        </Link>
      ) : null}
    </div>
  );
};

export default Title;
