import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);
dayjs.extend(timezone);

const site =
  process.env.NODE_ENV === 'production' && process.env.NEXT_PUBLIC_VERCEL_URL
    ? process.env.NEXT_PUBLIC_VERCEL_URL
    : 'http://localhost:3000';

const version = `${dayjs
  .tz(dayjs(), process.env.NEXT_PUBLIC_TIME_ZONE)
  .format('YYYY-MM-DD @ HH:mm:ss')
  .toString()} | ${process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA?.slice(0, 6) ?? ''}`.trim();

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
