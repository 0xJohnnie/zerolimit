import { _appVersion } from './constant';
import { getCurrentDate } from './util';

const site =
  process.env.NODE_ENV === 'production' && process.env.NEXT_PUBLIC_VERCEL_URL
    ? process.env.NEXT_PUBLIC_VERCEL_URL
    : 'http://localhost:3000';

const version = `${getCurrentDate()} | ${_appVersion}`;

const AppConfig = {
  site_name: 'Zerolimit',
  title: 'Zerolimit',
  title_template: '%s - by 0xJohnnie',
  site,
  description: 'The ultimate Web3 Dashboard',
  author: { name: '0xJohnnie', site: 'https://0xJohnnie.dev' },
  locale: 'en',
  version,
  keywords: ['0xJohnnie', 'Zerolimit', 'Web3 Dashboard'],
};

export default AppConfig;
