import { Stack, Title } from '@mantine/core';

import textClass from '@style/Text.module.css';

const Offline = () => {
  return (
    <>
      <Stack>
        <Title className={textClass.title} ta="center" mt={150}>
          You&apos;re offline
          <br />
          <br />
        </Title>
        <Title order={2} ta="center">
          Check your Internet connection
        </Title>
      </Stack>
    </>
  );
};

export default Offline;
