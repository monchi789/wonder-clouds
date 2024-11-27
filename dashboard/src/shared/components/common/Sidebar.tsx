import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import {
  Briefcase,
  FileUser,
  SquareUserRound,
  Building2,
  LayoutDashboard,
  BookA,
  User,
  PackageSearch,
  LogOut,
  Menu,
  BarChart3,
  Cloud
} from 'lucide-react'
import { logout } from '@/modules/auth/redux/authSlice'
import { AppDispatch } from '@/app/store'

interface MenuItemProps {
  to: string;
  icon: React.ReactNode;
  text: string;
  collapsed?: boolean;
  isActive?: boolean;
  badge?: number;
  onClick?: () => void;
}

const MenuItem: React.FC<MenuItemProps> = ({
  to,
  icon,
  text,
  collapsed,
  isActive,
  onClick
}) => (
  <Link to={to} onClick={onClick}>
    <li
      className={`
        flex flex-row items-center mx-2 mb-2 px-3 py-2 rounded-lg transition duration-300 relative
        ${isActive
          ? 'bg-wonder text-white'
          : 'text-white hover:bg-gray-400/50'
        }
      `}
    >
      {icon}
      {!collapsed && (
        <div className='flex items-center justify-between w-full'>
          <span className='my-auto ml-3'>{text}</span>
        </div>
      )}
    </li>
  </Link>
);

const menuItems = [
  {
    section: 'Panel de Control',
    items: [
      {
        to: '/',
        icon: <LayoutDashboard />,
        text: 'Panel General',
      }
    ]
  },
  {
    section: 'Gestión',
    items: [
      { to: '/clients', icon: <SquareUserRound />, text: 'Clientes' },
      { to: '/works', icon: <Briefcase />, text: 'Trabajos' },
      { to: '/services', icon: <Building2 />, text: 'Servicios' },
      { to: '/users', icon: <User />, text: 'Usuarios' }
    ]
  },
  {
    section: 'Contenido',
    items: [
      {
        to: '/posts',
        icon: <FileUser />,
        text: 'Publicaciones',
      },
      { to: '/general-type', icon: <BookA />, text: 'Tipos Generales' }
    ]
  },
  {
    section: 'Productos',
    items: [
      { to: '/products', icon: <PackageSearch />, text: 'Productos' }
    ]
  }
]

const Sidebar = () => {
  const [isHovered, setIsHovered] = useState(false)

  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const location = useLocation()

  const handleLogout = () => {
    dispatch(logout())
      .then(() => {
        navigate('/login')
      })
  }

  const handleMenuItemClick = () => {
    setIsHovered(false)
  }

  return (
    <>
      {/* Botón de menú móvil */}
      <button
        onClick={() => setIsHovered(!isHovered)}
        className='
          xl:hidden fixed top-4 left-4 z-40 
          bg-wonder-blue text-white p-2 rounded-md 
          hover:bg-wonder-blue/80 transition duration-300
        '
      >
        <Menu size={24} />
      </button>

      {/* Sidebar */}
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`
          left-0 top-0 bottom-0 z-30 
          xl:translate-x-0 
          transition-all duration-500 ease-in-out 
          bg-wonder-blue
          ${isHovered ? 'w-80' : 'w-16'}
          shadow-2xl
        `}
      >
        {/* Contenedor con altura completa para evitar scroll */}
        <div className='flex flex-col min-h-full'>
          {/* Logo de Wonderclouds */}
          <div className='flex items-center justify-center py-6 flex-shrink-0'>
            {isHovered ? (
              <div className='flex items-center text-white font-bold text-2xl'>
                Wonder Clouds
              </div>
            ) : (
              <Cloud className='text-white' />
            )}
          </div>

          {/* Contenido del menú */}
          <div className='flex-grow overflow-y-auto'>
            <div className='flex flex-col w-full'>
              {menuItems.map((section, sectionIndex) => (
                <div key={sectionIndex}>
                  {!isHovered ? null : (
                    <span className='text-gray-300 text-sm font-medium mx-5 mt-4 mb-2 uppercase'>
                      {section.section}
                    </span>
                  )}
                  <ul className='flex flex-col w-full justify-between'>
                    {section.items.map((item) => (
                      <MenuItem
                        key={item.to}
                        to={item.to}
                        icon={item.icon}
                        text={item.text}
                        collapsed={!isHovered}
                        isActive={location.pathname === item.to}
                        onClick={handleMenuItemClick}
                      />
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Botón de cerrar sesión */}
          <div className='mt-auto flex-shrink-0'>
            <button
              onClick={() => {
                handleLogout()
                setIsHovered(false)
              }}
              className='
                flex flex-row text-white text-base 
                hover:bg-red-800 rounded-lg 
                transition duration-300 
                items-center w-[calc(100%-1rem)] 
                mx-2 mb-4 px-3 py-2
              '
            >
              <LogOut />
              {isHovered && <span className='my-auto ml-3'>Cerrar sesión</span>}
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Sidebar
