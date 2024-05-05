import { FC } from 'react';

import { Button, Modal, SimpleGrid } from '@mantine/core';

import { _iconSize, DATA_SAVING_DELAY } from '@utils/constant';
import { saveToLocalStorage } from '@utils/util';

import { DataOverwriteModalProps } from '@Interface/form';

const DataOverwriteModal: FC<DataOverwriteModalProps> = ({
  dataOverwriteState,
  closeDataOverwrite,
  stopSavingData,
  mergedFormData,
  form,
  showHideNotification,
  formName,
}) => {
  const handleNoClick = () => {
    closeDataOverwrite();
    stopSavingData();
  };

  const handleYesClick = () => {
    if (mergedFormData) {
      showHideNotification(true);
      saveToLocalStorage(formName, mergedFormData);

      setTimeout(() => {
        showHideNotification(false);
        stopSavingData();
        form.reset();
      }, DATA_SAVING_DELAY);
    }
    closeDataOverwrite();
  };

  return (
    <Modal
      opened={dataOverwriteState}
      onClose={handleNoClick}
      size="auto"
      title="Dapp name already exists. Do you want to overwrite it?"
      centered
      withCloseButton={false}
    >
      <SimpleGrid cols={2} mt={_iconSize}>
        <Button onClick={handleNoClick}>No</Button>
        <Button onClick={handleYesClick}>Yes</Button>
      </SimpleGrid>
    </Modal>
  );
};

export default DataOverwriteModal;
