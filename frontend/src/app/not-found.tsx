// app/not-found.tsx

import Link from 'next/link';

export default function Custom404() {
  return (
    <div className="flex flex-col items-center justify-center my-24">
      <div className="text-center p-8 bg-white rounded-lg max-w-lg w-full">
        <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-600 mb-4">¡Ups! Página no encontrada</h2>
        <p className="text-gray-500 mb-8">
          Lo sentimos, la página que buscas no está disponible. 
        </p>
      </div>
    </div>
  );
}
