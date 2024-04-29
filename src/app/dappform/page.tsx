import { Metadata } from 'next';

import { Box, Stack, Title } from '@mantine/core';

import DappInputForm from '@components/DappInputForm';

import { _cssTitle } from '@utils/constant';

import appShellClasses from '@style/Appshell.module.css';

export const metadata: Metadata = {
  alternates: {
    canonical: '/dappform',
    languages: {
      'en-US': '/en-US',
    },
  },
};

const DappForm = () => {
  return (
    <>
      <Stack className={appShellClasses.fullWidth}>
        <Box>
          <Title className={_cssTitle}>Dapp Form</Title>
          <Title order={6}>Add new Dapps to the Dapp Store</Title>
        </Box>
        <DappInputForm />
      </Stack>
    </>
  );
};

export default DappForm;
