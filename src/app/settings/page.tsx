import { Metadata } from 'next';

import { Stack, Text } from '@mantine/core';

import InstallPWA from '@components/Pwa';

import { _appVersion, _cssTitle, _iconHalfSize } from '@utils/constant';

import appShellClasses from '@style/Appshell.module.css';

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
      <Stack className={appShellClasses.headerFullWidth}>
        <h1 className={_cssTitle}>Settings</h1>

        <Stack>
          <InstallPWA />
          <Text ta="center" size="sm" c="dimmed" my={_iconHalfSize}>
            App version : {_appVersion}
          </Text>
        </Stack>
      </Stack>
    </>
  );
};

export default Settings;
