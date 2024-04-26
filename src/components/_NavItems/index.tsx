import { IconHome, IconLayoutGrid, IconSettings } from '@tabler/icons-react';

import { createLinkItem } from '@utils/util';

import { ILinkItem } from '@Interface/navItem';

const NavItems: ILinkItem[] = [
  createLinkItem({
    label: 'Home',
    iconComponent: IconHome,
    webURL: '/',
  }),
  createLinkItem({
    label: 'Dappstore',
    iconComponent: IconLayoutGrid,
    webURL: '/dappstore',
  }),
  createLinkItem({
    label: 'Settings',
    iconComponent: IconSettings,
    webURL: '/settings',
  }),
];

export default NavItems;
