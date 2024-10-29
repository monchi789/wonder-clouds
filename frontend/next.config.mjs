/** @type {import('next').NextConfig} */
const nextConfig = {
  // Habilita la generación estática de parámetros
  experimental: {
    generateStaticParams: true,
  },
  
  // Optimizaciones para el sitemap
  poweredByHeader: false,
  
  // Configuración de redirecciones (opcional)
  async redirects() {
    return []
  },
  
  // Configuración de headers (opcional, pero recomendado para SEO)
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          }
        ]
      }
    ]
  }
};

export default nextConfig;