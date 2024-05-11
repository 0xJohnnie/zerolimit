'use client';

import { useEffect, useState } from 'react';

import { Button, Fieldset, SimpleGrid, Title } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

import { _lStorageDappStore, NOTIFICATION_CLOSE_DELAY } from '@utils/constant';
import { deleteFromLocalStorage, showNotificationMessage } from '@utils/util';

const StorageSettings = () => {
  const [loadingState, { close: stopLoadingState, open: startLoadingState }] =
    useDisclosure(false);

  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  const sectionHeader = `Local Storage`;
  const dappStore = `Dapp Store list`;

  const handleClick = (prefixMessage: string, storageName: string) => {
    startLoadingState();
    showNotificationMessage({
      title: sectionHeader,
      message: `${prefixMessage} successfully cleared`,
      autoCloseDuration: NOTIFICATION_CLOSE_DELAY,
    });
    deleteFromLocalStorage(storageName);

    const id = setTimeout(() => {
      stopLoadingState();
    }, NOTIFICATION_CLOSE_DELAY);
    setTimeoutId(id);
  };

  useEffect(() => {
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [timeoutId]);

  return (
    <>
      <Fieldset legend={sectionHeader}>
        <SimpleGrid cols={2}>
          <Title order={3}>{dappStore}</Title>
          <Button
            loading={loadingState}
            onClick={() => handleClick(dappStore, _lStorageDappStore)}
            fullWidth
          >{`Clear ${dappStore}`}</Button>
        </SimpleGrid>
      </Fieldset>
    </>
  );
};

export default StorageSettings;
