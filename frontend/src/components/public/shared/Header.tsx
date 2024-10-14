"use client" // Agregar esto para convertirlo en un Client Component

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation'; // Cambiar a next/navigation

const Header = () => {
  const pathname = usePathname(); // Obtener la ruta actual

  return (
    <nav className="flex items-center justify-between px-24 py-5 shadow-md z-10">
      <div className="flex items-center">
        <Image src="/static/images/wonder.png" alt="Logo Wonder Clouds Cusco" width={100} height={100} />
      </div>
      <div className="text-lg font-semibold space-x-10">
        <Link href="/">
          <span className={`cursor-pointer ${pathname === '/' ? 'text-color-background' : 'text-black'}`}>
            Inicio
          </span>
        </Link>
        <Link href="/nosotros">
          <span className={`cursor-pointer ${pathname === '/' ? 'text-color-background' : 'text-black'}`}>
            Nosotros
          </span>
        </Link>
        <Link href="/servicios">
          <span className={`cursor-pointer ${pathname === '/' ? 'text-color-background' : 'text-black'}`}>
            Servicios
          </span>
        </Link>
        <Link href="/proyectos">
          <span className={`cursor-pointer ${pathname === '/' ? 'text-color-background' : 'text-black'}`}>
            Proyectos
          </span>
        </Link>
        <Link href="/contactanos">
          <span className={`cursor-pointer ${pathname === '/' ? 'text-color-background' : 'text-black'}`}>
            Contáctanos
          </span>
        </Link>
      </div>
    </nav>
  );
}

export default Header;