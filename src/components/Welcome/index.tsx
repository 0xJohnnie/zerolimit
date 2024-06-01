'use client';

import Link from 'next/link';

import { Button, Divider, Text, Title } from '@mantine/core';

import AppConfig from '@utils/AppConfig';
import { _hrefDappstore, _iconHalfSize } from '@utils/constant';

import buttonClass from '@style/Button.module.css';
import textClass from '@style/Text.module.css';

export function Welcome() {
  return (
    <>
      <Title className={textClass.title} ta="center" m={50}>
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

      <Divider />
      <Button
        component={Link}
        href={_hrefDappstore}
        aria-label={'WAGMI'}
        my={_iconHalfSize}
        className={buttonClass.buttonSelected}
      >
        WAGMI 🚀
      </Button>
    </>
  );
}
