export default function Loading() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      <p className="ml-4 text-lg">Cargando...</p>
    </div>
  );
}