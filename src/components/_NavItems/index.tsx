import {
  IconHome,
  IconLayoutGrid,
  IconLayoutGridAdd,
  IconSettings,
} from '@tabler/icons-react';

import { createLinkItem } from '@utils/util';

import { ILinkItem } from '@Interface/navItem';

const NavItems: ILinkItem[] = [
  createLinkItem({
    label: 'Home',
    iconComponent: IconHome,
    webURL: '/',
  }),
  createLinkItem({
    label: 'Dapp Form',
    iconComponent: IconLayoutGridAdd,
    webURL: '/dappform',
  }),
  createLinkItem({
    label: 'Dapp Store',
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
