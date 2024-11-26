import { lazy, Suspense } from 'react';
import { Route, Routes, Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LoadingSpinner from '@/shared/components/common/LoadingSpinner';
import MainLayout from '@/shared/components/layouts/MainLayout';
import { RootState } from '@/app/store'; // Ajusta la ruta según tu configuración de store

const Login = lazy(() => import('@/modules/auth/pages/Login'));
const Client = lazy(() => import('@/modules/clients/pages/ClientsMain'));
const Works = lazy(() => import('@/modules/works/pages/WorksMain'));
const Post = lazy(() => import('@/modules/posts/pages/PostMain'));
const PostCreate = lazy(() => import('@/modules/posts/pages/PostCreate'));
const Service = lazy(() => import('@/modules/services/pages/ServiceMain'));
const GeneralType = lazy(() => import('@/modules/general-type/pages/GeneralTypeMain'));
const Products = lazy(() => import('@/modules/products/pages/ProductsMain'));
const UserMain = lazy(() => import('@/modules/users/pages/UserMain'));


interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const location = useLocation();
  const { accessToken } = useSelector((state: RootState) => state.auth);

  if (!accessToken) {
    // Redirige a login y guarda la ubicación de origen para redirigir después
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

const AppRoutes = () => {
  const routes = [
    { path: '/', element: <Client />, protected: true },
    { path: '/login', element: <Login />, protected: false },
    { path: '/clients', element: <Client />, protected: true },
    { path: '/works', element: <Works />, protected: true },
    { path: '/posts', element: <Post />, protected: true },
    { path: '/posts/new', element: <PostCreate />, protected: true },
    { path: '/services', element: <Service />, protected: true },
    { path: '/general-type', element: <GeneralType />, protected: true }
  ];

  return (
    <Suspense fallback={<LoadingSpinner size='w-12 h-12' screen={true} />}>
      <Routes>
        {routes.map(({ path, element, protected: isProtected }) => (
          <Route
            key={path}
            path={path}
            element={
              isProtected ? (
                <ProtectedRoute>
                  <MainLayout>{element}</MainLayout>
                </ProtectedRoute>
              ) : (
                element
              )
            }
          />
        ))}
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
