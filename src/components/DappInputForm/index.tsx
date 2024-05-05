'use client';

import {
  IconBrandAppleArcade,
  IconCalendar,
  IconCategory2,
  IconCheck,
  IconPhoto,
} from '@tabler/icons-react';
import { useCallback, useState } from 'react';

import {
  Box,
  Button,
  Divider,
  Fieldset,
  rem,
  Select,
  SimpleGrid,
  Stack,
  TextInput,
} from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import '@mantine/dates/styles.css';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';

import {
  _dappCategory,
  _dappForm,
  _iconStroke,
  DATA_SAVING_DELAY,
  NOTIFICATION_CLOSE_DELAY,
} from '@utils/constant';
import {
  getFromLocalStorage,
  isKeyInLocalStorage,
  saveToLocalStorage,
  toUnixTime,
} from '@utils/util';

import { DappForm, NotificationShowHideProps } from '@Interface/form';

import appShellClass from '@style/Appshell.module.css';
import buttonClass from '@style/Button.module.css';

import DataOverwriteModal from './DataOverwriteModal';
import {
  generateTextInput,
  initialValues,
  inputFields,
  validateForm,
} from './FormConstant';
import ResetFormModal from './ResetFormModal';

const notificationProps: NotificationShowHideProps = {
  id: 'savingData',
  title: 'Dapp Form',
  autoCloseDuration: NOTIFICATION_CLOSE_DELAY,
  trueMessage: 'Saving Dapp Form...',
  falseMessage: 'Dapp Form saved',
};

const showHideNotification = (showHide: boolean) => {
  const { id, title, autoCloseDuration, trueMessage, falseMessage } =
    notificationProps;

  const props = {
    id,
    title,
    loading: showHide,
    autoClose: showHide ? false : autoCloseDuration,
    withCloseButton: false,
    ...(showHide
      ? { message: trueMessage }
      : {
          message: falseMessage,
          color: 'teal',
          icon: <IconCheck style={{ width: rem(18), height: rem(18) }} />,
        }),
  };
  return showHide ? notifications.show(props) : notifications.update(props);
};

const DappInputForm = () => {
  const [resetFormState, { close: closeResetForm, open: openResetForm }] =
    useDisclosure(false);

  const [
    dataOverwriteState,
    { close: closeDataOverwrite, open: openDataOverwrite },
  ] = useDisclosure(false);

  const [savingDataState, { close: stopSavingData, open: startSavingData }] =
    useDisclosure();

  const [mergedFormData, setMergedFormData] = useState<DappForm>(initialValues);

  const form = useForm({
    mode: 'uncontrolled',
    initialValues,
    validate: validateForm,
    validateInputOnChange: true,
    // Need this here or else the validateInputOnChange will not work
    onValuesChange: () => {},

    transformValues: (values) => ({
      ...values,
      dateAdded: toUnixTime(values.dateAdded),
      dappName: values.dappName.trim(),
      category: values.category,
      logo: values.logo.trim().replace(/\/+$/, ''),
      website: values.website.trim().replace(/\/+$/, ''),
      twitter: values.twitter.trim(),
      discord: values.discord.trim(),
      telegram: values.telegram.trim(),
      youtube: values.youtube.trim(),
      github: values.github.trim(),
    }),
  });

  const storedValues = getFromLocalStorage(_dappForm);

  const handleFormSubmit = useCallback(
    (formValues: DappForm) => {
      const mergedValues = {
        ...storedValues,
        [formValues.dappName.toLowerCase()]: {
          ...formValues,
        },
      };
      setMergedFormData(mergedValues);
      startSavingData();

      if (
        storedValues &&
        isKeyInLocalStorage(formValues.dappName, storedValues)
      ) {
        openDataOverwrite();
      } else {
        showHideNotification(true);
        saveToLocalStorage(_dappForm, mergedValues);

        setTimeout(() => {
          showHideNotification(false);
          stopSavingData();
          form.reset();
        }, DATA_SAVING_DELAY);
      }
    },
    [form, openDataOverwrite, startSavingData, stopSavingData, storedValues],
  );

  const handleSubmit = form.onSubmit((values) => handleFormSubmit(values));

  return (
    <>
      <form onSubmit={handleSubmit} className={appShellClass.fullWidth}>
        <Stack className={appShellClass.fullWidth}>
          <Box>
            <Fieldset legend="Dapp Details">
              <SimpleGrid cols={{ base: 1, sm: 2 }}>
                <TextInput
                  label="Dapp Name"
                  placeholder="Enter Dapp name"
                  leftSection={<IconBrandAppleArcade stroke={_iconStroke} />}
                  withAsterisk
                  key={form.key('dappName')}
                  {...form.getInputProps('dappName')}
                />
                <Select
                  label="Category"
                  placeholder="Select category"
                  leftSection={<IconCategory2 stroke={_iconStroke} />}
                  withAsterisk
                  checkIconPosition="right"
                  data={_dappCategory}
                  withScrollArea={false}
                  key={form.key('category')}
                  {...form.getInputProps('category')}
                />
                <TextInput
                  label="Logo"
                  placeholder="Enter logo URL"
                  leftSection={<IconPhoto stroke={_iconStroke} />}
                  key={form.key('logo')}
                  {...form.getInputProps('logo')}
                />
                <DatePickerInput
                  label="Date Added"
                  valueFormat="DD-MMM-YYYY"
                  leftSection={<IconCalendar stroke={_iconStroke} />}
                  leftSectionPointerEvents="none"
                  key={form.key('dateAdded')}
                  {...form.getInputProps('dateAdded')}
                  withAsterisk
                />
              </SimpleGrid>
              <Divider />
              <SimpleGrid cols={{ base: 1, sm: 2 }}>
                {inputFields.map((field) => generateTextInput(form, field))}
              </SimpleGrid>
              <ResetFormModal
                resetFormState={resetFormState}
                closeResetForm={closeResetForm}
                form={form}
              />
              <DataOverwriteModal
                dataOverwriteState={dataOverwriteState}
                closeDataOverwrite={closeDataOverwrite}
                stopSavingData={stopSavingData}
                mergedFormData={mergedFormData}
                form={form}
                showHideNotification={showHideNotification}
                formName={_dappForm}
              />
              <Divider />
              <SimpleGrid cols={2}>
                <Button
                  onClick={openResetForm}
                  disabled={savingDataState || dataOverwriteState}
                >
                  Reset Form
                </Button>
                <Button
                  type="submit"
                  loading={savingDataState}
                  disabled={savingDataState || dataOverwriteState}
                  className={buttonClass.buttonSelected}
                >
                  Save
                </Button>
              </SimpleGrid>
            </Fieldset>
          </Box>
        </Stack>
      </form>
    </>
  );
};

export default DappInputForm;
