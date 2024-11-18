import React, { useState } from "react"
import { Link } from "react-router-dom";;
import { Briefcase, FileUser, Megaphone, SquareUserRound, Building2, ChevronLeft, ChevronRight, LayoutDashboard, BookA } from "lucide-react";

interface MenuItemProps {
  to: string;
  icon: React.ReactNode;
  text: string;
  collapsed?: boolean;
}

const MenuItem: React.FC<MenuItemProps> = ({ to, icon, text, collapsed }) => (
  <Link to={to}>
    <li className="flex flex-row text-white text-base hover:bg-uac-alter rounded-lg transition duration-300 mx-2 mb-2 px-3 py-2 items-center">
      {icon}
      {!collapsed && <span className="my-auto ml-3">{text}</span>}
    </li>
  </Link>
);

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  return (
    <>
      {/* Overlay for mobile */}
      {isMobileSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 xl:hidden"
          onClick={() => setIsMobileSidebarOpen(false)}
        />
      )}

      <div
        className={`fixed xl:static h-full z-30 ${isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } xl:translate-x-0 transition-all duration-500 ease-in-out bg-wonder-blue ${isSidebarOpen ? 'w-64' : 'w-16'}`}
      >
        {/* Collapse button */}
        <button
          className="absolute -right-3 top-8 bg-sky-500 text-white rounded-full p-1 hidden xl:flex items-center justify-center"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          {isSidebarOpen ? <ChevronLeft size={24} /> : <ChevronRight size={24} />}
        </button>

        <div className="flex flex-col h-full">
          <div className="flex-grow">
            <div className="flex flex-col w-full">
              <ul className="flex flex-col w-full justify-between pt-20">
                <MenuItem to="/" icon={<LayoutDashboard />} text="Panel general" collapsed={!isSidebarOpen} />
                {!isSidebarOpen ? null :
                  <span className="text-gray-400 text-sm font-medium mx-5 mt-4 mb-2">Gestión</span>
                }
                <MenuItem to="/clients" icon={<SquareUserRound />} text="Clientes" collapsed={!isSidebarOpen} />
                <MenuItem to="/works" icon={<Briefcase />} text="Trabajos" collapsed={!isSidebarOpen} />
                <MenuItem to="/services" icon={<Building2 />} text="Servicios" collapsed={!isSidebarOpen} />
                <MenuItem to="/general-type" icon={<BookA />} text="Tipos generales" collapsed={!isSidebarOpen} />

                {!isSidebarOpen ? null :
                  <span className="text-gray-400 text-sm font-medium mx-5 mt-4 mb-2">Contenido</span>
                }
                <MenuItem to="/posts" icon={<FileUser />} text="Publicaciones" collapsed={!isSidebarOpen} />
                <MenuItem to="/popups" icon={<Megaphone />} text="Anuncios" collapsed={!isSidebarOpen} />
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Sidebar;
