interface NavItem {
  label: string;
  webURL: string;
  showButton?: boolean;
  target?: string;
  icon: React.ReactNode;
  isDisabled?: boolean;
}
