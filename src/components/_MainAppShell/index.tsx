'use client';

import Image from 'next/image';
import Link from 'next/link';

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

import AppConfig from '@utils/AppConfig';
import {
  _appShellHeight,
  _appShellHide,
  _appShellPadding,
  _hideFooter,
  _hideHeader,
  _hideNavBar,
  _hrefHome,
  _logoPathDark,
  _logoPathLight,
  _logoSize,
  _navBarWidth,
} from '@utils/constant';
import { useCalcWidthHeight, useIsMobileScreen } from '@utils/util';

import appShellClasses from '@style/Appshell.module.css';

const MainAppShell = ({ children }: { children: React.ReactNode }) => {
  const { colorScheme } = useMantineColorScheme();
  const { width: screenWidth, height: screenHeight } = useViewportSize();

  const isMobileScreen = useIsMobileScreen();
  const { cWidth, cHeight } = useCalcWidthHeight();

  return screenHeight === 0 || screenWidth === 0 ? (
    <LoadingScreen />
  ) : (
    <>
      <AppShell
        padding={_appShellPadding}
        header={{ height: _appShellHeight, collapsed: _hideHeader }}
        navbar={{
          width: _navBarWidth,
          breakpoint: _appShellHide,
          collapsed: { mobile: true, desktop: _hideNavBar },
        }}
        footer={{
          height: _appShellHeight,
          collapsed: _hideFooter || isMobileScreen,
        }}
      >
        {/* +             START OF HEADER             + */}
        <AppShell.Header className={appShellClasses.headerFooterShell}>
          <Group
            w={cWidth}
            className={appShellClasses.headerFooterContent}
            wrap="nowrap"
            preventGrowOverflow
          >
            <Link href={_hrefHome} aria-label="logo">
              <Center style={{ gap: 4 }}>
                <Image
                  src={colorScheme === 'dark' ? _logoPathDark : _logoPathLight}
                  alt="logo"
                  width={_logoSize}
                  height={_logoSize}
                />
                <Title order={2}>{AppConfig.site_name}</Title>
              </Center>
            </Link>
            <ColorSchemeToggle />
          </Group>
        </AppShell.Header>
        {/* +              END OF HEADER              + */}

        {/* +             START OF NAVBAR             + */}
        <AppShell.Navbar className={appShellClasses.default}>
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
            <ScrollArea.Autosize type="always" h={cHeight} w={cWidth}>
              <Stack h={cHeight} className={appShellClasses.fullWidth}>
                {children}
              </Stack>
            </ScrollArea.Autosize>
          </Center>
        </AppShell.Main>

        {/* +              START OF FOOTER              + */}
        <AppShell.Footer className={appShellClasses.headerFooterShell}>
          <Group
            w={cWidth}
            className={appShellClasses.headerFooterContent}
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
