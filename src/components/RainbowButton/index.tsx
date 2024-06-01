import { ConnectButton } from '@rainbow-me/rainbowkit';
import { IconChevronDown } from '@tabler/icons-react';
import { useEffect } from 'react';
import { useAccount, useDisconnect } from 'wagmi';

import {
  Box,
  Button,
  ButtonProps,
  Group,
  Image,
  MantineSize,
} from '@mantine/core';
import { useFocusTrap } from '@mantine/hooks';

import { useStore } from '@components/store';

interface rainbowkitProps extends ButtonProps {
  /** Predefined button size */
  size?: MantineSize;
  /** Button type attribute */
  type?: 'submit' | 'button' | 'reset';
  /** Sets button width to 100% of parent element */
  fullWidth?: boolean;
  /** Text on the button */
  text?: string;
  /** show either chain and wallet address OR disconnect button */
  showDisconnectButton?: boolean;
}
const RainbowButton = (props: rainbowkitProps) => {
  const { text = 'Login', showDisconnectButton = false, size } = props;

  const focusTrapRef = useFocusTrap(true);

  // START of store
  const setWalletAddress = useStore((state) => state.setWalletAddress);
  const walletAddress = useStore((state) => state.walletAdd);

  const {
    // connector: activeConnector,
    isConnected,
    isDisconnected,
    address,
  } = useAccount();

  const { disconnect } = useDisconnect();

  //  const adapter = FirebaseAdapter(db);

  const handleLogOut = async () => {
    disconnect();
  };

  useEffect(() => {
    if (isConnected) {
      setWalletAddress(address);
    }
    if (isDisconnected) setWalletAddress('');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isConnected, isDisconnected]);

  useEffect(() => {
    if (
      address != undefined &&
      walletAddress != '' &&
      address != walletAddress
    ) {
      console.log('wallet addresss changed : updating store');
      setWalletAddress(address);
      disconnect();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address]);

  // END of store

  /*
    console.error('+++++++++++++++++++++++++++++++++++++++');
    console.log('wallet from WAGMI ', address);
    console.log('wallet from store ', walletAddress);
    console.error('+++++++++++++++++++++++++++++++++++++++');
   */
  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        mounted, // boolean
        openAccountModal,
        openChainModal,
        openConnectModal,
        accountModalOpen, //  boolean
        chainModalOpen, //  boolean
        connectModalOpen, //  boolean
        authenticationStatus,
        // ^ "loading" | "unauthenticated" | "authenticated"
      }) => {
        // Note: If your app doesn't use authentication, you
        // can remove all 'authenticationStatus' checks
        const ready = mounted && authenticationStatus !== 'loading';
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus || authenticationStatus === 'authenticated');

        return (
          <Group
            {...(!ready && {
              'aria-hidden': true,
              style: {
                opacity: 0,
                pointerEvents: 'none',
                userSelect: 'none',
              },
            })}
          >
            {(() => {
              // start : if disconnected from wallet apps

              if (!connected) {
                return (
                  /* Connect Modal */
                  <Button
                    ref={focusTrapRef}
                    onClick={openConnectModal}
                    type="submit"
                    loading={connectModalOpen}
                    disabled={connectModalOpen}
                    size={size}
                  >
                    {text}
                  </Button>
                );
              } // end : if disconnected from wallet apps

              // start : if chain unsupported
              if (chain.unsupported) {
                return (
                  /* Chain Modal */
                  <Button
                    onClick={openChainModal}
                    type="button"
                    loading={chainModalOpen}
                    disabled={chainModalOpen}
                  >
                    Wrong network
                  </Button>
                );
              } // end : if chain unsupported

              //  start : ui returned when logged in
              return (
                <>
                  {showDisconnectButton ? (
                    //   ONLY SHOW LOG OUT BUTTON
                    <Button
                      ref={focusTrapRef}
                      onClick={() => {
                        handleLogOut();
                      }}
                      size={size}
                      type="submit"
                    >
                      Log out
                    </Button>
                  ) : (
                    //  SHOW CHAIN AND WALLET ADDRESS
                    <div style={{ display: 'flex', gap: 8 }}>
                      {/* Chain Modal */}
                      <Button
                        onClick={openChainModal}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          padding: 8,
                        }}
                        type="button"
                        loading={chainModalOpen}
                        disabled={chainModalOpen}
                      >
                        {chain.hasIcon && (
                          <Box>
                            {chain.iconUrl && (
                              <Image
                                alt={chain.name ?? 'Chain icon'}
                                src={chain.iconUrl}
                                h={18}
                                w={18}
                              />
                            )}
                          </Box>
                        )}
                        <Box visibleFrom="xs">{'\xa0' + chain.name}</Box>
                        &nbsp;
                        <IconChevronDown size={18} stroke={3} />
                      </Button>

                      {/* Account Modal */}
                      <Button
                        onClick={openAccountModal}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          padding: 8,
                        }}
                        type="button"
                        loading={accountModalOpen}
                        disabled={accountModalOpen}
                      >
                        {account.displayName}
                        {/*
                      {account.displayBalance
                        ? ` (${account.displayBalance})`
                        : ''}
                      */}
                        &nbsp;
                        <IconChevronDown size={18} stroke={3} />
                      </Button>
                    </div>
                  )}
                </>
              ); //  end : ui returned when logged in
            })()}
          </Group>
        );
      }}
    </ConnectButton.Custom>
  );
};

export default RainbowButton;
