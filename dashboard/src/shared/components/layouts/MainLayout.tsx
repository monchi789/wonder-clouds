import { ReactNode } from "react";
import { Toaster } from "sonner";
import Sidebar from "../common/Sidebar";

const MainLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex h-screen bg-white">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Container */}
      <div className="flex-1 overflow-y-auto">
        {/* Main Content */}
        <main className="p-10">
          {children}
        </main>
      </div>

      <Toaster richColors position="bottom-right" />
    </div>
  );
};

export default MainLayout;
