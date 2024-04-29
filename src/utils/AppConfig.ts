import { _appVersion } from './constant';

const site =
  process.env.NODE_ENV === 'production' && process.env.NEXT_PUBLIC_VERCEL_URL
    ? process.env.NEXT_PUBLIC_VERCEL_URL
    : 'http://localhost:3000';

const AppConfig = {
  site_name: 'Zerolimit',
  title: 'Zerolimit',
  title_template: '%s - by 0xJohnnie',
  site,
  description: 'The ultimate Web3 Dashboard',
  author: { name: '0xJohnnie', site: 'https://0xJohnnie.dev' },
  locale: 'en',
  version: _appVersion,
  keywords: ['0xJohnnie', 'Zerolimit', 'Web3 Dashboard'],
};

export default AppConfig;
