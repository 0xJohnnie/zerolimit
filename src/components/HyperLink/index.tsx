import { ActionIcon, Group, Stack } from '@mantine/core';
import { IconBrandGithub, IconBrandTwitter } from '@tabler/icons-react';
import {
  _appShellPadding,
  _tabBarButtonSize,
  _tabBarIconStroke,
} from '@utils/constant';

import Link from 'next/link';

const hyperlinkItems: NavItem[] = [
  {
    label: '0xJohnnie Twitter',
    webURL: 'https://twitter.com/0xJohnnie',
    icon: <IconBrandTwitter stroke={_tabBarIconStroke} />,
  },
  {
    label: '0xJohnnie Github',
    webURL: 'https://github.com/0xJohnnie',
    icon: <IconBrandGithub stroke={_tabBarIconStroke} />,
  },
];

const HyperLink = () => (
  <Stack>
    <Group justify="center" gap={_appShellPadding} preventGrowOverflow>
      {hyperlinkItems.map((item) => (
        <ActionIcon
          key={item.webURL}
          component={Link}
          href={item.webURL}
          size={_tabBarButtonSize}
          aria-label={item.label}
          target="_blank"
          radius="xl"
        >
          {item.icon}
        </ActionIcon>
      ))}
    </Group>
  </Stack>
);

export default HyperLink;
