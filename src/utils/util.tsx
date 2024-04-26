import { useViewportSize } from '@mantine/hooks';

import { ILinkItem, ILinkItemOptions } from '@Interface/navItem';

import {
  _appShellHeight,
  _heightOffset,
  _hideFooter,
  _hideHeader,
  _iconSize,
  _screenBreakpoint,
  _tabBarIconStroke,
} from './constant';

export const useCalcWidthHeight = () => {
  const isMobileScreen = useIsMobileScreen();

  const headerOffset = _hideHeader ? 0 : _appShellHeight;
  const footerOffset = _hideFooter || isMobileScreen ? 0 : _appShellHeight;

  const heightOffset = _heightOffset + headerOffset + footerOffset;

  const cHeight = `calc(100dvh - (var(--app-shell-padding) * 2) - ${heightOffset}px)`;
  const cWidth = `calc(100dvw)`;

  return { cWidth, cHeight };
};

export const createLinkItem = ({
  label,
  iconComponent: CustomIcon,
  webURL,
  openInNewWindow = false,
  showButton = true,
  isDisabled = false,
}: ILinkItemOptions): ILinkItem => ({
  label,
  icon: <CustomIcon size={_iconSize} stroke={_tabBarIconStroke} />,
  webURL,
  target: openInNewWindow ? '_blank' : '_self',
  openInNewWindow,
  showButton,
  isDisabled,
});

export const useIsMobileScreen = () => {
  const { width: screenWidth } = useViewportSize();
  return !(screenWidth <= _screenBreakpoint);
};

export const getPWADisplayMode = () => {
  const isStandalone = window.matchMedia('(display-mode: standalone)').matches;

  if (document.referrer.startsWith('android-app://')) {
    return 'twa';
  } else if (
    (navigator as Navigator & { standalone?: boolean }).standalone ||
    isStandalone
  ) {
    return 'standalone';
  }
  return 'browser';
};
