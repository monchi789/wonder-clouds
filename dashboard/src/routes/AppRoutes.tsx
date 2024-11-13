import LoadingSpinner from '@/shared/components/common/LoadingSpinner';
import MainLayout from '@/shared/components/layouts/MainLayout';
import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

const Client = lazy(() => import('@/modules/clients/pages/ClientsMain'));

const routes = [
  { path: "/", element: <Client /> },
];

const AppRoutes = () => {
  return (
    <Suspense fallback={<LoadingSpinner size="w-12 h-12" screen={true} />}>
      <Routes>
        <Route path="/" element={<MainLayout><Client /></MainLayout>} />

        {/*routes.map(({ path, element }) => (
          <Route
            key={path}
            path={path}
            element={
              path === '/login' ? (
                element
              ) : (
                <MainLayout>
                  element
                </MainLayout>
              )
            }
          />
        ))
        */}
      </Routes>
    </Suspense>
  )
}

export default AppRoutes;