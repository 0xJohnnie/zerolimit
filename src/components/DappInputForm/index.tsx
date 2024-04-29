'use client';

import {
  Button,
  Divider,
  Modal,
  Select,
  SimpleGrid,
  Stack,
  TextInput,
} from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import '@mantine/dates/styles.css';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';

import { _dappCategory, _iconHalfSize } from '@utils/constant';

import appShellClasses from '@style/Appshell.module.css';
import buttonClass from '@style/Button.module.css';

const initialValues = {
  dapp: [
    {
      dateAdded: new Date(),
      name: '',
      category: '',
      logo: '',
      website: '',
      twitter: '',
      discord: '',
      telegram: '',
      youtube: '',
      github: '',
    },
  ],
};

const validate = {
  dapp: {
    name: (value: string) => (!value ? 'Name is required' : null),
    category: (value: any) => (!value ? 'Category is required' : null),
    website: (value: string) =>
      !value
        ? 'Website is required'
        : !/^https?:\/\/[^/]+/.test(value)
          ? 'Invalid Website URL'
          : null,
    twitter: (value: string) =>
      !value
        ? 'Twitter is required'
        : !/^https?:\/\/[^/]+/.test(value)
          ? 'Invalid Twitter URL'
          : null,
  },
};

const handleFormSubmit = (values: any, form: any) => {
  const storedValue = window.localStorage.getItem('dapp-form');

  let storedValues: { dapp?: { [key: string]: any } } = {};

  if (storedValue) {
    storedValues = JSON.parse(storedValue);
  }
  // Check if the name is unique
  if (storedValues.dapp && storedValues.dapp[values.dapp[0].name]) {
    const overwrite = window.confirm(
      'Dapp name already exists. Do you want to overwrite it?',
    );
    if (!overwrite) {
      return;
    }
  }

  // Merge the current form values with the stored values
  const mergedValues = {
    ...storedValues,
    dapp: {
      ...storedValues.dapp,
      [values.dapp[0].name]: values.dapp[0],
    },
  };

  // Store the merged values in local storage
  window.localStorage.setItem('dapp-form', JSON.stringify(mergedValues));

  form.reset();
};

const DappInputForm = () => {
  const [opened, { close, open }] = useDisclosure(false);

  const form = useForm({
    mode: 'uncontrolled',
    initialValues,
    validate,
  });

  return (
    <>
      <Stack className={appShellClasses.fullWidth}>
        <form
          onSubmit={form.onSubmit((values) => handleFormSubmit(values, form))}
        >
          <SimpleGrid cols={2} spacing="xs" verticalSpacing="xs">
            <TextInput
              label="Name"
              placeholder="Enter Dapp name"
              withAsterisk
              key={form.key('dapp.0.name')}
              {...form.getInputProps('dapp.0.name')}
            />
            <Select
              label="Category"
              placeholder="Select category"
              withAsterisk
              checkIconPosition="right"
              data={_dappCategory}
              withScrollArea={false}
              key={form.key('dapp.0.category')}
              {...form.getInputProps('dapp.0.category')}
            />
            <TextInput
              label="Logo"
              placeholder="Enter logo"
              key={form.key('dapp.0.logo')}
              {...form.getInputProps('dapp.0.logo')}
            />
            <DatePickerInput
              label="Date Added"
              valueFormat="DD-MMM-YYYY @ HH:mm:ss"
              key={form.key('dapp.0.dateAdded')}
              {...form.getInputProps('dapp.0.dateAdded')}
              withAsterisk
            />
          </SimpleGrid>
          <Divider />
          <SimpleGrid cols={2} spacing="xs" verticalSpacing="xs">
            <TextInput
              label="Website"
              placeholder="Enter Website URL"
              withAsterisk
              key={form.key('dapp.0.website')}
              {...form.getInputProps('dapp.0.website')}
            />
            <TextInput
              label="Twitter"
              placeholder="Enter Twitter URL"
              withAsterisk
              key={form.key('dapp.0.twitter')}
              {...form.getInputProps('dapp.0.twitter')}
            />
            <TextInput
              label="Discord"
              placeholder="Enter Discord URL"
              key={form.key('dapp.0.discord')}
              {...form.getInputProps('dapp.0.discord')}
            />
            <TextInput
              label="Telegram"
              placeholder="Enter Telegram URL"
              key={form.key('dapp.0.telegram')}
              {...form.getInputProps('dapp.0.telegram')}
            />
            <TextInput
              label="Youtube"
              placeholder="Enter Youtube URL"
              key={form.key('dapp.0.youtube')}
              {...form.getInputProps('dapp.0.youtube')}
            />
            <TextInput
              label="Github"
              placeholder="Enter Github URL"
              key={form.key('dapp.0.github')}
              {...form.getInputProps('dapp.0.github')}
            />
          </SimpleGrid>
          <Divider />
          <Modal
            opened={opened}
            onClose={close}
            size="auto"
            title="Are you sure you want to reset the form?"
            centered
            withCloseButton={false}
          >
            <SimpleGrid
              cols={2}
              spacing="xs"
              verticalSpacing="xs"
              m={_iconHalfSize}
            >
              <Button
                onClick={() => {
                  close();
                }}
              >
                No
              </Button>
              <Button
                onClick={() => {
                  console.log('Resetting form');
                  form.reset();
                  close();
                }}
              >
                Yes
              </Button>
            </SimpleGrid>
          </Modal>
          <Stack>
            <SimpleGrid cols={2}>
              <Button onClick={open}>Reset Form</Button>
              <Button
                onClick={() => {
                  console.table(form.getValues().dapp);
                }}
              >
                check log
              </Button>
            </SimpleGrid>
            <Button
              type="submit"
              mb={_iconHalfSize}
              className={buttonClass.buttonSelected}
            >
              Save
            </Button>
          </Stack>
        </form>
      </Stack>
    </>
  );
};

export default DappInputForm;
