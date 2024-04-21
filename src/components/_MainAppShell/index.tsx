'use client';

import SideBar from '@components/_SideBar';
import TabBar from '@components/_TabBar';
import ColorSchemeToggle from '@components/ColorSchemeToggle';
import SocialMedia from '@components/HyperLink';
import LoadingScreen from '@components/LoadingScreen';
import {
  AppShell,
  Group,
  ScrollArea,
  Stack,
  Title,
  useMantineColorScheme,
} from '@mantine/core';
import { useViewportSize } from '@mantine/hooks';
import AppConfig from '@utils/AppConfig';
import {
  _appShellHeight,
  _appShellHide,
  _appShellPadding,
  _forceShowFooter,
  _hrefHome,
  _logoPathDark,
  _logoPathLight,
  _navBarWidth,
} from '@utils/constant';

import Image from 'next/image';
import Link from 'next/link';

const MainAppShell = ({ children }: { children: React.ReactNode }) => {
  const { colorScheme } = useMantineColorScheme();
  const { width: screenWidth, height: screenHeight } = useViewportSize();

  const isOpened = false;

  const calculateHeight = () => {
    if (_forceShowFooter || screenWidth < 575) {
      return `calc(100vh - ${_appShellHeight * 2}px - 20px)`;
    }
    return `calc(100vh - ${_appShellHeight}px - 20px)`;
  };

  return screenHeight === 0 && screenWidth === 0 ? (
    <LoadingScreen />
  ) : (
    <>
      <AppShell
        header={{ height: _appShellHeight }}
        navbar={{
          width: _navBarWidth,
          breakpoint: _appShellHide,
          collapsed: { mobile: !isOpened, desktop: false },
        }}
        footer={{
          height: _appShellHeight,
          collapsed: _forceShowFooter ? false : screenWidth >= 575,
        }}
        padding={_appShellPadding}
      >
        {/* +             START OF HEADER             + */}
        <AppShell.Header
          p={_appShellPadding}
          style={{ alignContent: 'center' }}
        >
          <Group
            justify="space-between"
            h="100%"
            gap={_appShellPadding}
            wrap="nowrap"
            preventGrowOverflow
          >
            <Link href={_hrefHome}>
              <Group aria-label="logo">
                <Image
                  src={colorScheme === 'dark' ? _logoPathDark : _logoPathLight}
                  alt="logo"
                  width={50}
                  height={50}
                />
                <Title>{AppConfig.site_name}</Title>
              </Group>
            </Link>
            <Group
              justify="flex-end"
              gap="xs"
              wrap="nowrap"
              preventGrowOverflow
            >
              <ColorSchemeToggle />
            </Group>
          </Group>
        </AppShell.Header>
        {/* +              END OF HEADER              + */}

        {/* +             START OF NAVBAR             + */}
        <AppShell.Navbar p={_appShellPadding}>
          {/* START : NAVBAR CONTENT */}
          <AppShell.Section my={_appShellPadding} component={ScrollArea} grow>
            <SideBar />
          </AppShell.Section>
          {/* END : NAVBAR CONTENT */}

          {/* START : NAVBAR FOOTER */}
          <AppShell.Section my={_appShellPadding}>
            <Stack>
              <SocialMedia />
            </Stack>
          </AppShell.Section>
          {/* END : NAVBAR FOOTER */}
        </AppShell.Navbar>
        {/* +              END OF NAVBAR              + */}

        <AppShell.Main>
          <Stack p={_appShellPadding} h={`${calculateHeight()}`}>
            {children}
          </Stack>
        </AppShell.Main>

        {/* +              START OF FOOTER              + */}
        <AppShell.Footer
          p={_appShellPadding}
          style={{ alignContent: 'center' }}
        >
          <TabBar />
        </AppShell.Footer>
        {/* +              END OF FOOTER              + */}
      </AppShell>
    </>
  );
};

export default MainAppShell;
