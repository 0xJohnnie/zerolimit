import { MetadataRoute } from 'next';

import AppConfig from '@utils/AppConfig';

const sitemap = (): MetadataRoute.Sitemap => {
  return [
    {
      url: `${AppConfig.site}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${AppConfig.site}/Dappstore`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${AppConfig.site}/settings`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ];
};

export default sitemap;
