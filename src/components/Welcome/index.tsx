'use client';

import AppConfig from '@/utils/AppConfig';
import Link from 'next/link';

import { Button, Stack, Text, Title } from '@mantine/core';

import { _buttonSize, _hrefDappstore, _iconSize } from '@utils/constant';

import textClasses from '@style/Text.module.css';

export function Welcome() {
  return (
    <>
      <Stack>
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
          This site contains a directory of Dapps
          <br />
          <br />
          Do your own research and proceed at your own risk
        </Text>
      </Stack>
      <Button
        component={Link}
        href={_hrefDappstore}
        aria-label={'WAGMI'}
        size={_buttonSize}
        my={_iconSize}
      >
        WAGMI 🚀
      </Button>
    </>
  );
}
