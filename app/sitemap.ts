import { MetadataRoute } from 'next'
import { createClient } from '@supabase/supabase-js'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Creamos cliente de Supabase para leer los productos en el servidor
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL as string,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string
  );

  const { data: products } = await supabase.from('products').select('id, created_at');

  // Mapeamos los productos a URLs
  const productUrls: MetadataRoute.Sitemap = products?.map((product) => ({
    url: `https://joined.pe/products/${product.id}`,
    lastModified: product.created_at ? new Date(product.created_at) : new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  })) || [];

  // Retornamos todas las URLs de la tienda
  return [
    {
      url: 'https://joined.pe',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: 'https://joined.pe/products',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: 'https://joined.pe/comunidad',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: 'https://joined.pe/nosotros',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: 'https://joined.pe/libro-de-reclamaciones',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    ...productUrls, // Agregamos todos los productos
  ]
}