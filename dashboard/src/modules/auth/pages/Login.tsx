import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserCircle, Lock } from 'lucide-react';
import useAuth from '@/modules/auth/hooks/useAuth';
import { getTokenAuth } from '@/modules/auth/services/auth.api';

const Login: React.FC = () => {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setError('');

    const res = await getTokenAuth(user,password)

    login(res);

    navigate('/');
  };

  return (
    <div className="min-h-screen bg-white-alter flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-xl overflow-hidden">
        <div className="px-6 py-8 md:px-8">

          <h2 className="mt-4 text-2xl font-bold text-center text-gray-800">
            Bienvenido de nuevo
          </h2>

          <p className="mt-2 text-sm text-center text-gray-600">
            Ingresa a tu cuenta para continuar
          </p>

          <form className="space-y-6 mt-8" onSubmit={handleSubmit} >
            <div>
              {error && <p className="error">{error}</p>}
              <label className="block text-sm font-medium text-gray-700">
                Nombre de usuario
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <UserCircle className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={user}
                  onChange={(e) => setUser(e.target.value)}
                  required
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="usuario"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Contraseña
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="text-sm">
                <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                  ¿Olvidaste tu contraseña?
                </a>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Iniciar Sesión
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;