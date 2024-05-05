import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

import { useViewportSize } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';

import { ILinkItem, ILinkItemOptions } from '@Interface/navItem';

import {
  _appShellFooterHeight,
  _appShellHeaderHeight,
  _heightOffset,
  _hideFooter,
  _hideHeader,
  _iconSize,
  _iconStroke,
  _screenBreakpoint,
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
  icon: <CustomIcon size={_iconSize} stroke={_iconStroke} />,
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

export const getCurrentDateWithTime = (withTime?: boolean) => {
  const format = withTime ? 'YYYY-MM-DD @ HH:mm:ss' : 'YYYY-MM-DD';

  return dayjs
    .tz(dayjs(), process.env.NEXT_PUBLIC_TIME_ZONE)
    .format(format)
    .toString();
};

export const formatDate = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export const saveToLocalStorage = (objName: string, values: any) => {
  window.localStorage.setItem(objName, JSON.stringify(values));
};

export const getFromLocalStorage = (objName: string) => {
  const storedValue = window.localStorage.getItem(objName);
  return storedValue ? JSON.parse(storedValue) : {};
};

export const isKeyInLocalStorage = (
  inputName: string,
  storageValue: any,
): boolean => {
  if (!inputName || !storageValue) {
    return false;
  }

  const lowerCaseInput = inputName.toLowerCase();
  const lowerCaseKeys = Object.keys(storageValue).map((key) =>
    key.toLowerCase(),
  );

  return lowerCaseKeys.includes(lowerCaseInput);
};

const showNotificationMessage = ({
  id,
  title,
  autoCloseDuration,
  message,
}: {
  id: string;
  title: string;
  message: string;
  autoCloseDuration?: number;
}) => {
  const notificationProps = {
    id,
    title,
    loading: false,
    autoClose: autoCloseDuration ?? 1500,
    withCloseButton: false,
    message,
  };
  return notifications.show(notificationProps);
};

export const toUnixTime = (
  date: string | number | Date | dayjs.Dayjs | null | undefined,
) => {
  return dayjs(date).unix();
};

export const fromUnixTime = (unixTime: number) => {
  return dayjs.unix(unixTime).toDate();
};
