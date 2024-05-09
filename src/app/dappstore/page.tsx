import { Metadata } from 'next';
import dynamic from 'next/dynamic';

import { Box, Title } from '@mantine/core';

import { _cssTitle } from '@utils/constant';

export const metadata: Metadata = {
  alternates: {
    canonical: '/dappstore',
    languages: {
      'en-US': '/en-US',
    },
  },
};

const DappDisplay = dynamic(() => import('@components/DappDisplay'));

const DappStore = () => {
  return (
    <>
      <Box>
        <Title className={_cssTitle}>Dapp Store</Title>
        <Title order={6} mt={8}>
          Discover DeFi, NFT, Gaming, Depin, and more in the Web3 Space
        </Title>
        <DappDisplay />
      </Box>
    </>
  );
};

export default DappStore;
