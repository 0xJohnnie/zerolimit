'use client';

import { ParticleNetwork } from '@particle-network/auth';
import { particleWallet } from '@particle-network/rainbowkit-ext';
import {
  connectorsForWallets,
  darkTheme,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import '@rainbow-me/rainbowkit/styles.css';
import {
  argentWallet,
  coinbaseWallet,
  imTokenWallet,
  injectedWallet,
  ledgerWallet,
  metaMaskWallet,
  omniWallet,
  rabbyWallet,
  rainbowWallet,
  trustWallet,
  walletConnectWallet,
} from '@rainbow-me/rainbowkit/wallets';
import { useMemo } from 'react';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import { arbitrum, mainnet, optimism, polygon } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';

import AppConfig from '@utils/AppConfig';

const walletconnectProjectId = process.env
  .NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID as string;

const AuthParticle = ({ children }: { children: any }) => {
  const particle = useMemo(
    () =>
      new ParticleNetwork({
        projectId: process.env.NEXT_PUBLIC_PROJECT_ID as string,
        clientKey: process.env.NEXT_PUBLIC_CLIENT_KEY as string,
        appId: process.env.NEXT_PUBLIC_APP_ID as string,

        chainName: 'Ethereum',
        chainId: 1,
        wallet: {
          displayWalletEntry: false,
        },
        preload: true,
      }),
    [],
  );

  const { chains, publicClient, webSocketPublicClient } = configureChains(
    [mainnet, polygon, optimism, arbitrum],
    [publicProvider()],
  );

  const commonOptions = {
    chains,
    projectId: walletconnectProjectId,
  };

  const popularWallets = useMemo(
    () => ({
      groupName: 'Social Login',
      wallets: [
        particleWallet({ chains, authType: 'twitter' }),
        particleWallet({ chains, authType: 'discord' }),
        particleWallet({ chains, authType: 'google' }),
        particleWallet({ chains, authType: 'apple' }),
        particleWallet({ chains, authType: 'facebook' }),
        particleWallet({ chains, authType: 'github' }),
      ],
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [particle],
  );

  const connectors = connectorsForWallets([
    popularWallets,
    {
      groupName: 'Web3 Wallets',
      wallets: [
        rabbyWallet(commonOptions),
        metaMaskWallet(commonOptions),
        coinbaseWallet({ appName: AppConfig.site_name, ...commonOptions }),
        ledgerWallet(commonOptions),
        walletConnectWallet(commonOptions),
        injectedWallet(commonOptions),
        trustWallet(commonOptions),
        rainbowWallet(commonOptions),
        argentWallet(commonOptions),
        omniWallet(commonOptions),
        imTokenWallet(commonOptions),
      ],
    },
  ]);

  const wagmiClient = createConfig({
    autoConnect: true,
    connectors,
    publicClient,
    webSocketPublicClient,
  });

  return (
    <>
      <WagmiConfig config={wagmiClient}>
        <RainbowKitProvider chains={chains} theme={darkTheme()}>
          {children}
        </RainbowKitProvider>
      </WagmiConfig>
    </>
  );
};

export default AuthParticle;
