import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Button, Stack } from '@mantine/core';

import NavItems from '@components/_NavItems';

import { _buttonSize } from '@utils/constant';

import buttonClass from '@style/Button.module.css';

const SideBar = () => {
  const pathname = usePathname();

  const isCurrentPageSelected = (page: string): boolean => {
    return pathname === page;
  };

  return (
    <Stack>
      {NavItems.map(
        (item) =>
          item.showButton && (
            <Button
              key={item.label}
              aria-label={item.label}
              component={Link}
              href={item.webURL}
              target={item.target}
              className={
                isCurrentPageSelected(item.webURL)
                  ? buttonClass.buttonSelected
                  : buttonClass.buttonDefault
              }
              size={_buttonSize}
              justify="flex-start"
              leftSection={item.icon}
              fullWidth
            >
              {item.label}
            </Button>
          ),
      )}
    </Stack>
  );
};

export default SideBar;
