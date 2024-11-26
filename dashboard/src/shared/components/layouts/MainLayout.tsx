import { Toaster } from 'sonner';
import { Outlet } from 'react-router-dom';
import Sidebar from '../common/Sidebar';

const MainLayout = () => {
  return (
    <div className="flex h-screen bg-white">
      <Sidebar />

      <div className="flex-1 overflow-y-auto">
        <main className="p-10">
          <Outlet />
        </main>
      </div>

      <Toaster richColors position="bottom-right" />
    </div>
  );
};

export default MainLayout;
