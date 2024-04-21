import { Button, Stack } from '@mantine/core';
import { _cssTitle } from '@utils/constant';

import Link from 'next/link';

const NotFound = () => {
  return (
    <Stack h={'100vh'} justify="center" align="center">
      <h1 className={_cssTitle}>404 - PAGE NOT FOUND</h1>

      <Link href="/">
        <Button size="lg">Go home</Button>
      </Link>
    </Stack>
  );
};

export default NotFound;
