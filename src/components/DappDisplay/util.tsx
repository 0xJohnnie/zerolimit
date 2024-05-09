export const getButtonURL = (socialKey: string) => {
  const baseUrls: { [key: string]: string } = {
    twitter: 'https://twitter.com/',
    discord: 'https://discord.gg/',
    telegram: 'https://t.me/',
    youtube: 'https://youtube.com/@',
    github: 'https://github.com/',
  };
  return baseUrls[socialKey] || '';
};

export const getButtonBackgroundColor = (
  socialKey: string,
  socialValue: string,
) => {
  if (!socialValue) {
    return 'var(--mantine-color-dark-6)';
  }

  const colors: { [key: string]: string } = {
    twitter: '#009af9',
    discord: '#7289DA',
    telegram: '#00496d',
    youtube: '#8d0000',
    github: '#151515',
  };
  return colors[socialKey] || '';
};
