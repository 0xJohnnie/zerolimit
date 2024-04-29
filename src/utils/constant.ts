export const _appVersion =
  process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA?.slice(0, 6).trim() ?? '';

/*  >>>>> THEME <<<<< */
export const _defaultColorScheme = 'dark';
export const _defaultPrimaryColor = 'violet';
export const _defaultFontWeight = 400;
export const _defaultRadius = 'md';

// Default size is sm //  'xs' | 'sm' | 'md' | 'lg' | 'xl'
export const _buttonSize = 'md';
export const _buttonRadius = 'lg';
export const _darkHoverColor = '#513391';

// Appshell
export const _hideHeader = false;
export const _hideNavBar = false;
export const _hideFooter = false;

export const _appShellPadding = 'sm';
export const _appShellHide = 'xs';

export const _appShellHeaderHeight = 60;
export const _appShellFooterHeight = 72;
export const _heightOffset = 0;
export const _screenBreakpoint = 576;

export const _navBarWidth = 250;

// Logo
export const _logoSize = 42;
export const _logo = '/icon/android-chrome-512x512.png';
export const _logoApple = '/icon/apple-touch-icon.png';

// Icon
export const _iconSize = 32;
export const _iconHalfSize = _iconSize / 2;

export const _tabBarButtonSize = 'xl';
export const _tabBarIconStroke = 1.5;

export const _hrefHome = '/';
export const _hrefDappstore = '/dappstore';
export const _hrefSettings = '/settings';

export const _cssTitle = 'text-3xl font-bold';

export const _dappCategory = [
  'All',
  'Analytics',
  'Dex',
  'Depin',
  'Exchange',
  'Gambling',
  'Gaming',
  'Infrastructure',
  'NFT',
  'NFT Marketplace',
  'Social',
  'Wallet',
  'Others',
].sort((a, b) => {
  // 'All' will always be on top and 'Others' will always be at the bottom
  if (a === 'All') return -1;
  if (b === 'All') return 1;
  if (a === 'Others') return 1;
  if (b === 'Others') return -1;
  return a.localeCompare(b);
});
