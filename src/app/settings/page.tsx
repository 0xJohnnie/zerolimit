import { Metadata } from 'next';

import { _cssTitle } from '@utils/constant';

export const metadata: Metadata = {
  alternates: {
    canonical: '/settings',
    languages: {
      'en-US': '/en-US',
    },
  },
};

const Settings = () => {
  return <h1 className={_cssTitle}>Settings</h1>;
};

export default Settings;
