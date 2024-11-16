// src/components/ProtectedRoute.tsx
import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoutes = ({ children }: ProtectedRouteProps) => {
  const token = Cookies.get('authToken');
  const location = useLocation();

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoutes;
