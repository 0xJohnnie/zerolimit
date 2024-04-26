import { IconMoon, IconSun } from '@tabler/icons-react';

import { ActionIcon, useMantineColorScheme } from '@mantine/core';

import { _tabBarButtonSize, _tabBarIconStroke } from '@utils/constant';

import buttonClass from '@style/Button.module.css';

const ColorSchemeToggle = () => {
  const { setColorScheme, colorScheme } = useMantineColorScheme();

  const isLight = colorScheme === 'light';
  const Icon = isLight ? IconMoon : IconSun;
  const label = isLight ? 'Dark Mode' : 'Light Mode';

  const handleClick = () => {
    setColorScheme(isLight ? 'dark' : 'light');
  };

  return (
    <ActionIcon
      aria-label={label}
      size={_tabBarButtonSize}
      onClick={handleClick}
      className={buttonClass.buttonDefault}
    >
      <Icon stroke={_tabBarIconStroke} />
    </ActionIcon>
  );
};

export default ColorSchemeToggle;
