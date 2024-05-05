import { FC } from 'react';

import { Button, Modal, SimpleGrid } from '@mantine/core';

import { _iconSize } from '@utils/constant';

import { ResetFormModalProps } from '@Interface/form';

const ResetFormModal: FC<ResetFormModalProps> = ({
  resetFormState,
  closeResetForm,
  form,
}) => {
  const handleYesClick = () => {
    form.reset();
    closeResetForm();
  };

  return (
    <Modal
      opened={resetFormState}
      onClose={closeResetForm}
      size="auto"
      title="Are you sure you want to clear all form data?"
      centered
      withCloseButton={false}
    >
      <SimpleGrid cols={2} mt={_iconSize}>
        <Button onClick={closeResetForm}>No</Button>
        <Button onClick={handleYesClick}>Yes</Button>
      </SimpleGrid>
    </Modal>
  );
};

export default ResetFormModal;
