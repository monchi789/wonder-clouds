import { useContext } from 'react';
import AuthContext from '../../../contexts/AuthContext'; // Ajusta la ruta según tu estructura

const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('Error al usar el AuthProvider');
  }
  return context;
};

export default useAuth;
