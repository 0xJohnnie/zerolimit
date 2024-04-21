import { createTheme, rem } from '@mantine/core';
import buttonClass from '@style/Button.module.css';

import { _buttonRadius, _defaultPrimaryColor } from './constant';

export const theme = createTheme({
  fontSizes: {
    xs: rem(12), // 10
    sm: rem(14), // 11
    md: rem(18), // 14
    lg: rem(24), // 16
    xl: rem(36), // 20
  },
  fontFamily: 'Roboto, sans-serif',
  primaryColor: _defaultPrimaryColor,
  primaryShade: 8,
  luminanceThreshold: 0.5,
  autoContrast: true,
  cursorType: 'pointer',
  defaultRadius: _buttonRadius,
  activeClassName: buttonClass.buttonDefault,
});
