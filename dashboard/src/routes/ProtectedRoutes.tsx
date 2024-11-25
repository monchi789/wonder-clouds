// src/components/ProtectedRoute.tsx
<<<<<<< HEAD
import type { ReactNode } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import Cookies from 'js-cookie'
=======
import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';
>>>>>>> 17f69aaeda972e32a5b43750dc1714f882dad88e

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoutes = ({ children }: ProtectedRouteProps) => {
  const token = Cookies.get('authToken');
  const location = useLocation();

  if (!token) {
    return <Navigate to='/login' state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoutes;
