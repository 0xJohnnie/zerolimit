'use client';

import { useCallback } from 'react';

import { Button, Fieldset, SimpleGrid, Title } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

import { _dappForm, NOTIFICATION_CLOSE_DELAY } from '@utils/constant';
import { deleteFromLocalStorage, showNotificationMessage } from '@utils/util';

const StorageSettings = () => {
  const [loadingState, { close: stopLoadingState, open: startLoadingState }] =
    useDisclosure(false);

  const handleClick = useCallback(() => {
    startLoadingState();
    showNotificationMessage({
      title: 'Local Storage',
      message: 'Local Storage successfully cleared',
      autoCloseDuration: NOTIFICATION_CLOSE_DELAY,
    });
    deleteFromLocalStorage(_dappForm);

    setTimeout(() => {
      stopLoadingState();
    }, 750);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Fieldset legend="Storage">
        <SimpleGrid cols={2}>
          <Title order={3}>Local Storage</Title>

          <Button loading={loadingState} onClick={handleClick} fullWidth>
            Clear Local Storage
          </Button>
        </SimpleGrid>
      </Fieldset>
    </>
  );
};

export default StorageSettings;
