import { _cssTitle } from '@utils/constant';

import { Metadata } from 'next';

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
