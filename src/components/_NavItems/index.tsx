import { IconHome, IconLayoutGrid, IconSettings } from '@tabler/icons-react';
import { _tabBarIconStroke } from '@utils/constant';

const NavItems: NavItem[] = [
  {
    label: 'Home',
    webURL: `/`,
    icon: <IconHome stroke={_tabBarIconStroke} />,
    showButton: true,
  },
  {
    label: 'Dappstore',
    webURL: '/dappstore',
    icon: <IconLayoutGrid stroke={_tabBarIconStroke} />,
    showButton: true,
  },
  {
    label: 'Settings',
    webURL: `/settings`,
    icon: <IconSettings stroke={_tabBarIconStroke} />,
    showButton: true,
  },
];

export default NavItems;
