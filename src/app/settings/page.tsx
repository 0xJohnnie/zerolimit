import { Metadata } from 'next';

import { Stack, Text } from '@mantine/core';

import InstallPWA from '@components/Pwa';

import { _appVersion, _cssTitle } from '@utils/constant';

export const metadata: Metadata = {
  alternates: {
    canonical: '/settings',
    languages: {
      'en-US': '/en-US',
    },
  },
};

const Settings = () => {
  return (
    <>
      <h1 className={_cssTitle}>Settings</h1>

      <Stack>
        <InstallPWA />
        <Text ta="center" size="sm" c="dimmed">
          App version : {_appVersion}
        </Text>
      </Stack>
    </>
  );
};

export default Settings;
