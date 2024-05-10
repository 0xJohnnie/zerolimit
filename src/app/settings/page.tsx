import { Metadata } from 'next';
import dynamic from 'next/dynamic';

import { Stack, Text, Title } from '@mantine/core';

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

const StorageSettings = dynamic(() => import('./storageSettings'));

const Settings = () => {
  return (
    <>
      <Stack className={appShellClasses.headerFullWidth}>
        <Stack>
          <Title className={_cssTitle}>Settings</Title>
          <Title order={6} mt={8}>
            Manage all settings at a glance
          </Title>
          <StorageSettings />
        </Stack>

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
