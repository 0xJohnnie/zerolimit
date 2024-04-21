import { _cssTitle } from '@utils/constant';

import { Metadata } from 'next';

export const metadata: Metadata = {
  alternates: {
    canonical: '/dappstore',
    languages: {
      'en-US': '/en-US',
    },
  },
};
const DappStore = () => {
  return <h1 className={_cssTitle}>Dappstore</h1>;
};

export default DappStore;
