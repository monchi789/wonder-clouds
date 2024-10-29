// app/sitemap.ts
import { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // URLs estáticas de tu sitio
  const routes: MetadataRoute.Sitemap = [
    {
      url: 'https://wonderclouds.dev',
      lastModified: new Date().toISOString(),
      changeFrequency: 'daily' as const,
      priority: 1
    },
    {
      url: 'https://wonderclouds.dev/nosotros',
      lastModified: new Date().toISOString(),
      changeFrequency: 'daily' as const,
      priority: 1
    },
    {
      url: 'https://wonderclouds.dev/servicios',
      lastModified: new Date().toISOString(),
      changeFrequency: 'daily' as const,
      priority: 1
    },
    {
      url: 'https://wonderclouds.dev/proyectos',
      lastModified: new Date().toISOString(),
      changeFrequency: 'daily' as const,
      priority: 1
    },
    {
      url: 'https://wonderclouds.dev/contactanos',
      lastModified: new Date().toISOString(),
      changeFrequency: 'daily' as const,
      priority: 1
    }
  ]

  // Para rutas dinámicas (cuando las implementes):
  /*
  const dynamicRoutes = posts.map((post) => ({
    url: `https://wonderclouds.dev/blog/${post.slug}`,
    lastModified: new Date(post.updatedAt).toISOString(),
    changeFrequency: 'weekly' as const,
    priority: 0.8
  }))
  
  return [...routes, ...dynamicRoutes]
  */

  return routes
}