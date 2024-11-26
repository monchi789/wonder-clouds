import React, { useState, FormEvent, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState, AppDispatch } from '@/app/store'; // Ajusta la ruta según tu estructura

import {
  UserCircle,
  Lock,
  Eye,
  EyeOff
} from 'lucide-react';
import { Button } from '@/shared/components/ui/button'; // Ajusta según tus componentes
import { Input } from '@/shared/components/ui/input'; // Ajusta según tus componentes
import { Alert, AlertDescription } from '@/shared/components/ui/alert'; // Ajusta según tus componentes
import LoadingSpinner from '@/shared/components/common/LoadingSpinner'; // Ajusta la ruta
import wonder from '@/assets/images/wonderclouds.webp'; // Ajusta la ruta de tu logo
import MemeList from '../components/MemeList'; // Si tienes este componente
import { login, reset } from '../redux/authSlice';

const Login: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    contrasena: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const { email, contrasena } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state: RootState) => state.auth
  );

  useEffect(() => {
    if (isSuccess || user) {
      navigate('/');
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const userData = {
      email: email,
      contrasena: contrasena
    };

    dispatch(login(userData));
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4'>
      <div className='w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden'>
        {/* Header with Logo */}
        <div className='w-full flex justify-center pt-8 pb-4'>
          <img src={wonder} alt='Logo wonder' className='w-32' loading='lazy' />
        </div>

        {/* Meme Section with Fixed Height */}
        <div className='px-6'>
          <div className='bg-gray-50 rounded-lg overflow-hidden'>
            <MemeList />
          </div>
        </div>

        {/* Login Form Section */}
        <div className='px-6 py-8'>
          <div className='space-y-6'>
            <div className='text-center'>
              <h2 className='text-2xl font-bold text-gray-900'>Bienvenido de nuevo</h2>
              <p className='mt-2 text-sm text-gray-600'>Ingresa a tu cuenta para continuar</p>
            </div>

            {isError && message && (
              <Alert variant='destructive'>
                <AlertDescription>
                  {Array.isArray(message)
                    ? message.join(', ')
                    : message}
                </AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit} className='space-y-6'>
              <div className='space-y-4'>
                <div>
                  <label htmlFor='email' className='block text-sm font-medium text-gray-700'>
                    Correo institucional
                  </label>
                  <div className='mt-1 relative'>
                    <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                      <UserCircle className='h-5 w-5 text-gray-400' />
                    </div>
                    <Input
                      id='email'
                      name='email'
                      type='text'
                      required
                      className='pl-10'
                      placeholder='email'
                      value={email}
                      onChange={handleInputChange}
                      disabled={isLoading}
                      autoComplete='email'
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor='contrasena' className='block text-sm font-medium text-gray-700'>
                    Contraseña
                  </label>
                  <div className='mt-1 relative'>
                    <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                      <Lock className='h-5 w-5 text-gray-400' />
                    </div>
                    <Input
                      id='contrasena'
                      name='contrasena'
                      type={showPassword ? 'text' : 'password'}
                      required
                      className='pl-10 pr-10'
                      placeholder='••••••••'
                      value={contrasena}
                      onChange={handleInputChange}
                      disabled={isLoading}
                      autoComplete='current-password'
                    />
                    <button
                      type='button'
                      className='absolute inset-y-0 right-0 pr-3 flex items-center'
                      onClick={togglePasswordVisibility}
                    >
                      {showPassword ? (
                        <EyeOff className='h-5 w-5 text-gray-400 hover:text-gray-500' />
                      ) : (
                        <Eye className='h-5 w-5 text-gray-400 hover:text-gray-500' />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              <div className='flex items-center justify-between'>
                <div className='flex items-center'>
                  <input
                    id='remember-me'
                    name='remember-me'
                    type='checkbox'
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className='h-4 w-4 rounded border-gray-300 text-wonder-blue focus:ring-wonder'
                  />
                  <label htmlFor='remember-me' className='ml-2 block text-sm text-gray-700'>
                    Recordarme
                  </label>
                </div>

                <a href='#' className='text-sm font-medium text-wonder-blue hover:text-wonder'>
                  ¿Olvidaste tu contraseña?
                </a>
              </div>

              <Button
                type='submit'
                className='w-full bg-wonder-blue hover:bg-wonder transition-colors duration-300'
                disabled={isLoading}
              >
                {isLoading ? <LoadingSpinner /> : 'Iniciar Sesión'}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
