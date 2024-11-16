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
      changeFrequency: 'weekly' as const,
      priority: 0.8
    },
    {
      url: 'https://wonderclouds.dev/servicios',
      lastModified: new Date().toISOString(),
      changeFrequency: 'weekly' as const,
      priority: 0.8
    },
    {
      url: 'https://wonderclouds.dev/proyectos',
      lastModified: new Date().toISOString(),
      changeFrequency: 'monthly' as const,
      priority: 0.7
    },
    {
      url: 'https://wonderclouds.dev/contactanos',
      lastModified: new Date().toISOString(),
      changeFrequency: 'monthly' as const,
      priority: 0.6
    }
  ];

  return routes;
}
