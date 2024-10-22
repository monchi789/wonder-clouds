'use client'

import { ChevronsRight } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation'; // Usamos usePathname para obtener la ruta actual

const Breadcrumb = () => {
  const pathname = usePathname(); // Obtiene la ruta actual
  const pathSegments = pathname.split('/').filter(segment => segment);

  return (
    <nav className="breadcrumb">
      <ol className="flex space-x-2 font-semibold">
        <li>
          <Link href="/">
            Inicio
          </Link>
        </li>

        {pathSegments.map((segment, index) => {
          const href = '/' + pathSegments.slice(0, index + 1).join('/');
          const isLast = index === pathSegments.length - 1;

          return (
            <li key={href} className="flex items-center">
              <span className="mx-2"><ChevronsRight color="#FFA947" /></span>
              {!isLast ? (
                <Link href={href}>
                  <a className="text-blue-500 capitalize">{segment}</a>
                </Link>
              ) : (
                <span className="capitalize">{segment}</span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;