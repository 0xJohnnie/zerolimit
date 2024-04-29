import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { ActionIcon } from '@mantine/core';

import NavItems from '@components/_NavItems';

import { _tabBarButtonSize } from '@utils/constant';

import buttonClass from '@style/Button.module.css';

const TabBar = () => {
  const pathname = usePathname();

  const isCurrentPageSelected = (page: string): boolean => {
    return pathname === page;
  };

  return (
    <>
      {NavItems.map((item) => (
        <ActionIcon
          key={item.label}
          aria-label={item.label}
          component={Link}
          href={item.webURL}
          target={item.target}
          size={_tabBarButtonSize}
          className={
            isCurrentPageSelected(item.webURL)
              ? buttonClass.buttonSelected
              : buttonClass.buttonDefault
          }
        >
          {item.icon}
        </ActionIcon>
      ))}
    </>
  );
};

export default TabBar;
