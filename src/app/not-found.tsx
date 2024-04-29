import Link from 'next/link';

import { Button, Stack, Title } from '@mantine/core';

import { _buttonSize, _hrefHome, _iconSize } from '@utils/constant';

import textClass from '@style/Text.module.css';

const NotFound = () => {
  return (
    <>
      <Stack>
        <Title className={textClass.title} ta="center" mt={150}>
          404 - PAGE NOT FOUND
        </Title>
      </Stack>
      <Button
        component={Link}
        href={_hrefHome}
        aria-label={'Go home'}
        size={_buttonSize}
        my={_iconSize}
        fullWidth
      >
        Go home
      </Button>
    </>
  );
};

export default NotFound;
