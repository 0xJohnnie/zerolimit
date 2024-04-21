import AppConfig from '@utils/AppConfig';

import { MetadataRoute } from 'next';

const robots = (): MetadataRoute.Robots => {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/404', '/500', '/private/*', '/api/*'],
    },
    host: `${AppConfig.site}`,
  };
};

export default robots;
