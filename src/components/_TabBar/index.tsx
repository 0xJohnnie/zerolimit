import NavItems from '@components/_NavItems';
import { ActionIcon, Group } from '@mantine/core';
import buttonClass from '@style/Button.module.css';
import { _appShellPadding, _tabBarButtonSize } from '@utils/constant';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const TabBar = () => {
  const pathname = usePathname();

  const isCurrentPageSelected = (page: string): boolean => {
    return pathname === page;
  };

  return (
    <Group justify="space-between" gap={_appShellPadding} preventGrowOverflow>
      {NavItems.map((item) => (
        <ActionIcon
          key={item.webURL}
          component={Link}
          href={item.webURL}
          size={_tabBarButtonSize}
          aria-label={item.label}
          disabled={item.isDisabled || isCurrentPageSelected(item.webURL)}
          className={
            isCurrentPageSelected(item.webURL)
              ? buttonClass.buttonSelected
              : buttonClass.buttonDefault
          }
        >
          {item.icon}
        </ActionIcon>
      ))}
    </Group>
  );
};

export default TabBar;
