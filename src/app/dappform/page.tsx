import { Metadata } from 'next';
import dynamic from 'next/dynamic';

import { Box, Stack, Title } from '@mantine/core';

import { _cssTitle } from '@utils/constant';

import appShellClass from '@style/Appshell.module.css';

export const metadata: Metadata = {
  alternates: {
    canonical: '/dappform',
    languages: {
      'en-US': '/en-US',
    },
  },
};

const DappInputForm = dynamic(() => import('@components/DappInputForm'));

const DappForm = () => {
  return (
    <>
      <Stack className={appShellClass.fullWidth}>
        <Box>
          <Title className={_cssTitle}>Dapp Form</Title>
          <Title order={6} mt={8}>
            Add new Dapps to the Dapp Store
          </Title>
        </Box>
        <DappInputForm />
      </Stack>
    </>
  );
};

export default DappForm;
