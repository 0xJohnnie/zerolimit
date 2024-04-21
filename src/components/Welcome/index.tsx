import { Button, Center, Container, Stack, Text, Title } from '@mantine/core';
import textClasses from '@style/Text.module.css';
import { _buttonSize, _hrefDappstore } from '@utils/constant';

import Link from 'next/link';

import AppConfig from '@/utils/AppConfig';

export function Welcome() {
  return (
    <>
      <Stack h={'100%'}>
        <Title className={textClasses.title} ta="center" m={50}>
          Welcome to{' '}
          <Text
            inherit
            variant="gradient"
            component="span"
            gradient={{ from: 'pink', to: 'yellow' }}
          >
            {AppConfig.site_name}
          </Text>
        </Title>
        <Text size="md" ta="center">
          This site contains a directory of trusted Dapps
          <br />
          <br />
          Proceed at your own risk
        </Text>
      </Stack>
      <Button
        size={_buttonSize}
        component={Link}
        href={_hrefDappstore}
        aria-label={'Proceed'}
        fullWidth
      >
        Proceed
      </Button>
    </>
  );
}
