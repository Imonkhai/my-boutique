import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://giftcollection.com';
  const routes = [
    '', '/shop', '/collections', '/new-arrivals', '/best-sellers',
    '/sale', '/about', '/contact', '/faq', '/blog', '/privacy', '/terms',
  ];

  return routes.map(route => ({
    url: `${base}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'daily' : 'weekly',
    priority: route === '' ? 1 : 0.8,
  }));
}
