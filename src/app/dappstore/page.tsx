import { Metadata } from 'next';

import { Title } from '@mantine/core';

import { _cssTitle } from '@utils/constant';

export const metadata: Metadata = {
  alternates: {
    canonical: '/dappstore',
    languages: {
      'en-US': '/en-US',
    },
  },
};
const DappStore = () => {
  return (
    <>
      <Title className={_cssTitle}>Dapp Store</Title>
    </>
  );
};

export default DappStore;
