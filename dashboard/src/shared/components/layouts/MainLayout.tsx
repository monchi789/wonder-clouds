import { ReactNode } from "react";
import { Toaster } from "sonner";
import Sidebar from "../common/Sidebar";

const MainLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex min-h-screen h-screen overflow-hidden bg-white">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Container */}
      <div className="flex-1 flex flex-col w-full overflow-hidden">

        {/* Main Content - Scrollable */}
        <main className="flex-1 overflow-auto p-10">
          {children}
        </main>
      </div>

      <Toaster richColors position="bottom-right" />
    </div>
  );
}

export default MainLayout;