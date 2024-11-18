import LoadingSpinner from '@/shared/components/common/LoadingSpinner';
import MainLayout from '@/shared/components/layouts/MainLayout';
import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import ProtectedRoutes from './ProtectedRoutes';
import ClientsMain from '@/modules/clients/pages/ClientsMain';

const Login = lazy(() => import('@/modules/auth/pages/Login'));
const Client = lazy(() => import('@/modules/clients/pages/ClientsMain'));
const Post = lazy(() => import('@/modules/posts/pages/PostMain'));
const PostCreate = lazy(() => import('@/modules/posts/pages/PostCreate'));
const Service = lazy(() => import('@/modules/services/pages/ServiceMain'));
const GeneralType = lazy(() => import('@/modules/general-type/pages/GeneralTypeMain'));

const routes = [
  { path: "/", element: <Client /> },
  { path: "/login", element: <Login /> },
  { path: "/clients", element: <ClientsMain />},
  { path: "/posts", element: <Post />},
  { path: "/posts/new", element: <PostCreate /> },
  { path: "/services", element: <Service />},
  {path: "/general-type", element: <GeneralType />}
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
