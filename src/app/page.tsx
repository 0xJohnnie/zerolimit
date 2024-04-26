import { Metadata } from 'next';

import { Welcome } from '@components/Welcome';

export const metadata: Metadata = {
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/en-US',
    },
  },
};

const Home = () => {
  return <Welcome />;
};
export default Home;
