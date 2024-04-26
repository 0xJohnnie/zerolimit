import { Icon, IconProps } from '@tabler/icons-react';
import react from 'react';

export interface ILinkItem {
  label: string;
  icon: React.ReactNode;
  webURL: string;
  target: string;
  openInNewWindow?: boolean;
  showButton?: boolean;
  isDisabled?: boolean;
}

export interface ILinkItemOptions extends Omit<ILinkItem, 'icon' | 'target'> {
  iconComponent: react.ForwardRefExoticComponent<
    Omit<IconProps, 'ref'> & react.RefAttributes<Icon>
  >;
}
