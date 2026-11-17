import { MetadataRoute } from 'next'
 
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin/', '/api/', '/profile'], // Bloqueamos áreas privadas para Google
    },
    sitemap: 'https://joined.pe/sitemap.xml',
  }
}