import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import LoadingSpinner from '@/shared/components/common/LoadingSpinner';
import MainLayout from '@/shared/components/layouts/MainLayout';
import ProtectedRoute from './ProtectedRoutes';

const Login = lazy(() => import('@/modules/auth/pages/Login'));
const Home = lazy(() => import('@/modules/home/pages/HomeMain'));
const Client = lazy(() => import('@/modules/clients/pages/ClientsMain'));
const Works = lazy(() => import('@/modules/works/pages/WorksMain'));
const Post = lazy(() => import('@/modules/posts/pages/PostMain'));
const PostCreate = lazy(() => import('@/modules/posts/pages/PostCreate'));
const Service = lazy(() => import('@/modules/services/pages/ServiceMain'));
const GeneralType = lazy(() => import('@/modules/general-type/pages/GeneralTypeMain'));
const Products = lazy(() => import('@/modules/products/pages/ProductsMain'));
const Users = lazy(() => import('@/modules/users/pages/UserMain'));

const AppRoutes = () => {
  return (
    <Suspense fallback={<LoadingSpinner size="w-12 h-12" screen={true} />}>
      <Routes>

        <Route path="/login" element={<Login />} />

        <Route
          element={
            <ProtectedRoute>
              <MainLayout/>
            </ProtectedRoute>
          }
        >
          <Route path="/" element={<Home />} />
          <Route path="/clients" element={<Client />} />
          <Route path="/works" element={<Works />} />
          <Route path="/posts" element={<Post />} />
          <Route path="/posts/new" element={<PostCreate />} />
          <Route path="/services" element={<Service />} />
          <Route path="/general-type" element={<GeneralType />} />
          <Route path="/products" element={<Products />} />
          <Route path="/users" element={<Users />} />
        </Route>
        
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
