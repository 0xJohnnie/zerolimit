import { IconBrandGithub, IconBrandTwitter } from '@tabler/icons-react';
import Link from 'next/link';

import { ActionIcon, Group, Stack } from '@mantine/core';

import { _appShellPadding, _tabBarButtonSize } from '@utils/constant';
import { createLinkItem } from '@utils/util';

import { ILinkItem } from '@Interface/navItem';

const hyperlinkItems: ILinkItem[] = [
  createLinkItem({
    label: '0xJohnnie Twitter',
    iconComponent: IconBrandTwitter,
    webURL: 'https://twitter.com/0xJohnnie',
    openInNewWindow: true,
  }),
  createLinkItem({
    label: '0xJohnnie Github',
    iconComponent: IconBrandGithub,
    webURL: 'https://github.com/0xJohnnie',
    openInNewWindow: true,
  }),
];

const HyperLink = () => (
  <Stack>
    <Group justify="center" gap={_appShellPadding} preventGrowOverflow>
      {hyperlinkItems.map((item) => (
        <ActionIcon
          key={item.webURL}
          aria-label={item.label}
          component={Link}
          href={item.webURL}
          target={item.target}
          size={_tabBarButtonSize}
          radius="xl"
        >
          {item.icon}
        </ActionIcon>
      ))}
    </Group>
  </Stack>
);

export default HyperLink;
