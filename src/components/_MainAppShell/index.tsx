'use client';

import defaultAppSettings from '@data/defaultAppSettings.json';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect } from 'react';

import {
  AppShell,
  Center,
  Group,
  ScrollArea,
  Stack,
  Title,
  useMantineColorScheme,
} from '@mantine/core';
import { useViewportSize } from '@mantine/hooks';

import SideBar from '@components/_SideBar';
import TabBar from '@components/_TabBar';
import ColorSchemeToggle from '@components/ColorSchemeToggle';
import SocialMedia from '@components/HyperLink';
import LoadingScreen from '@components/LoadingScreen';
import RainbowButton from '@components/RainbowButton';

import AppConfig from '@utils/AppConfig';
import {
  _appShellFooterHeight,
  _appShellHeaderHeight,
  _appShellHide,
  _appShellPadding,
  _hideFooter,
  _hideHeader,
  _hideNavBar,
  _hrefHome,
  _logo,
  _logoSize,
  _lStorageSettings,
  _navBarWidth,
  _showThemeToggle,
} from '@utils/constant';
import {
  getFromLocalStorage,
  saveToLocalStorage,
  useCalcWidthHeight,
  useIsMobileScreen,
} from '@utils/util';

import appShellClass from '@style/Appshell.module.css';

const MainAppShell = ({ children }: { children: React.ReactNode }) => {
  const { colorScheme } = useMantineColorScheme();
  const { width: screenWidth, height: screenHeight } = useViewportSize();

  const isMobileScreen = useIsMobileScreen();
  const { cWidth, cHeight } = useCalcWidthHeight();

  useEffect(() => {
    const settings = getFromLocalStorage(_lStorageSettings);

    if (!settings) {
      saveToLocalStorage(_lStorageSettings, defaultAppSettings);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return screenHeight === 0 || screenWidth === 0 ? (
    <LoadingScreen />
  ) : (
    <>
      <AppShell
        padding={_appShellPadding}
        header={{ height: _appShellHeaderHeight, collapsed: _hideHeader }}
        navbar={{
          width: _navBarWidth,
          breakpoint: _appShellHide,
          collapsed: { mobile: true, desktop: _hideNavBar },
        }}
        footer={{
          height: _appShellFooterHeight,
          collapsed: _hideFooter || isMobileScreen,
        }}
      >
        {/* +             START OF HEADER             + */}
        <AppShell.Header className={appShellClass.headerFooterShell}>
          <Group
            w={cWidth}
            className={appShellClass.headerFooterContent}
            wrap="nowrap"
            preventGrowOverflow
            style={{ overflow: 'visible' }}
          >
            <Link href={_hrefHome} aria-label="logo">
              <Center style={{ gap: 8 }}>
                <Image
                  src={_logo}
                  alt="logo"
                  width={_logoSize}
                  height={_logoSize}
                  style={{
                    filter: colorScheme === 'dark' ? 'invert(1)' : 'invert(0)',
                    borderRadius: 8,
                  }}
                />
                <Title order={2}>{AppConfig.site_name}</Title>
              </Center>
            </Link>
            <Group>
              {_showThemeToggle && <ColorSchemeToggle />}
              <RainbowButton />
            </Group>
          </Group>
        </AppShell.Header>
        {/* +              END OF HEADER              + */}

        {/* +             START OF NAVBAR             + */}
        <AppShell.Navbar className={appShellClass.default}>
          {/* START : NAVBAR CONTENT */}
          <AppShell.Section component={ScrollArea} grow>
            <SideBar />
          </AppShell.Section>
          {/* END : NAVBAR CONTENT */}

          {/* START : NAVBAR FOOTER */}
          <AppShell.Section>
            <SocialMedia />
          </AppShell.Section>
          {/* END : NAVBAR FOOTER */}
        </AppShell.Navbar>
        {/* +              END OF NAVBAR              + */}

        <AppShell.Main>
          <Center>
            <ScrollArea.Autosize type="never" h={cHeight} w={cWidth}>
              <Stack h={cHeight} p={8} className={appShellClass.fullWidth}>
                {children}
              </Stack>
            </ScrollArea.Autosize>
          </Center>
        </AppShell.Main>

        {/* +              START OF FOOTER              + */}
        <AppShell.Footer className={appShellClass.headerFooterShell}>
          <Group
            w={cWidth}
            className={appShellClass.headerFooterContent}
            wrap="nowrap"
            preventGrowOverflow
          >
            <TabBar />
          </Group>
        </AppShell.Footer>
        {/* +              END OF FOOTER              + */}
      </AppShell>
    </>
  );
};

export default MainAppShell;
