import NavItems from '@components/_NavItems';
import { Button, Stack } from '@mantine/core';
import buttonClass from '@style/Button.module.css';
import { _buttonSize } from '@utils/constant';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

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
              key={item.webURL}
              component={Link}
              href={item.webURL}
              target={item.target ?? '_self'}
              size={_buttonSize}
              aria-label={item.label}
              disabled={item.isDisabled || isCurrentPageSelected(item.webURL)}
              className={
                isCurrentPageSelected(item.webURL)
                  ? buttonClass.buttonSelected
                  : buttonClass.buttonDefault
              }
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
