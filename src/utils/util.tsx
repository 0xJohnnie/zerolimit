import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

import { useViewportSize } from '@mantine/hooks';

import { ILinkItem, ILinkItemOptions } from '@Interface/navItem';

import {
  _appShellFooterHeight,
  _appShellHeaderHeight,
  _heightOffset,
  _hideFooter,
  _hideHeader,
  _iconSize,
  _screenBreakpoint,
  _tabBarIconStroke,
} from './constant';

dayjs.extend(utc);
dayjs.extend(timezone);

export const useCalcWidthHeight = () => {
  const isMobileScreen = useIsMobileScreen();

  const headerOffset = _hideHeader ? 0 : _appShellHeaderHeight;
  const footerOffset =
    _hideFooter || isMobileScreen ? 0 : _appShellFooterHeight;

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

export const getCurrentDate = () => {
  return dayjs
    .tz(dayjs(), process.env.NEXT_PUBLIC_TIME_ZONE)
    .format('YYYY-MM-DD @ HH:mm:ss')
    .toString();
};
