import LoadingSpinner from '@/shared/components/common/LoadingSpinner';
import MainLayout from '@/shared/components/layouts/MainLayout';
import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import ProtectedRoutes from './ProtectedRoutes';

const Login = lazy(() => import('@/modules/auth/pages/Login'))
const Client = lazy(() => import('@/modules/clients/pages/ClientsMain'));
const Posts = lazy(() => import('@/modules/posts/pages/PostsMain'))

const routes = [
  { path: "/", element: <Client /> },
  { path: "/login", element: <Login /> },
  { path: "/posts", element: <Posts />}
];

const AppRoutes = () => {
  return (
    <Suspense fallback={<LoadingSpinner size="w-12 h-12" screen={true} />}>
      <Routes>
        {routes.map(({ path, element }) => (
          <Route
            key={path}
            path={path}
            element={
              path === '/login' ? (
                element
              ) : (
                <ProtectedRoutes>
                  <MainLayout>
                    {element}
                  </MainLayout>
                </ProtectedRoutes>
              )
            }
          />
        ))}

      </Routes>
    </Suspense>
  )
}

export default AppRoutes;