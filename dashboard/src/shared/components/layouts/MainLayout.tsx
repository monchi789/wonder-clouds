import { Toaster } from 'sonner';
import { Outlet } from 'react-router-dom';
import Sidebar from '../common/Sidebar';

const MainLayout = () => {

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      <Sidebar />

      <div className="flex-1 overflow-y-auto bg-gray-50 transition-all duration-500 ease-in-out">

        <main className="p-6 md:p-10">
          <Outlet />
        </main>

      </div>

      <Toaster richColors position="bottom-right" />
    </div>
  );
};

export default MainLayout;
