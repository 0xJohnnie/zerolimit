import {
  IconBrandDiscord,
  IconBrandGithub,
  IconBrandTelegram,
  IconBrandX,
  IconBrandYoutube,
  IconWorld,
} from '@tabler/icons-react';

import { TextInput } from '@mantine/core';
import { isNotEmpty, UseFormReturnType } from '@mantine/form';

import { _iconStroke, urlPattern } from '@utils/constant';

import { DappForm, FormInputItem } from '@Interface/form';

export const initialValues: DappForm = {
  dateAdded: new Date(),
  dappName: '',
  category: '',
  logo: '',
  website: '',
  dappSocial: {
    twitter: '',
    discord: '',
    telegram: '',
    youtube: '',
    github: '',
  },
};

export const inputFields: FormInputItem[] = [
  {
    key: 'website',
    name: 'Website',
    label: 'Website',
    placeholder: 'e.g. https://www.zerolimit.app',
    icon: <IconWorld stroke={_iconStroke} />,
    required: true,
  },
  {
    key: 'dappSocial.twitter',
    name: 'Twitter',
    label: 'Twitter Username',
    placeholder: 'e.g. 0xJohnnie',
    icon: <IconBrandX stroke={_iconStroke} />,
    required: true,
  },
  {
    key: 'dappSocial.discord',
    name: 'Discord',
    label: 'Discord Server invite code',
    placeholder: 'e.g. aUm9R0zm',
    icon: <IconBrandDiscord stroke={_iconStroke} />,
  },
  {
    key: 'dappSocial.telegram',
    name: 'Telegram',
    label: 'Telegram Username',
    placeholder: 'e.g. Johnnie',
    icon: <IconBrandTelegram stroke={_iconStroke} />,
  },
  {
    key: 'dappSocial.youtube',
    name: 'Youtube',
    label: 'Youtube Username',
    placeholder: 'e.g. 0xJohnnie',
    icon: <IconBrandYoutube stroke={_iconStroke} />,
  },
  {
    key: 'dappSocial.github',
    name: 'Github',
    label: 'Github Username',
    placeholder: 'e.g. 0xJohnnie',
    icon: <IconBrandGithub stroke={_iconStroke} />,
  },
];

export const generateTextInput = (
  form: UseFormReturnType<DappForm>,
  field: FormInputItem,
) => (
  <TextInput
    label={field.label}
    placeholder={field.placeholder}
    leftSection={field.icon}
    withAsterisk={field.required ?? false}
    key={form.key(field.key)}
    {...form.getInputProps(field.key)}
  />
);

const lengthBetween = (min: number, max: number) => (value: string) => {
  const lengthBetweenRegex = new RegExp(`^.{${min},${max}}$`);

  return !lengthBetweenRegex.test(value)
    ? `Should be ${min} to ${max} characters long`
    : null;
};

export const validateForm = {
  dappName: (value: string) => {
    if (!value.trim()) {
      return 'Required';
    }
    if (!/^.{1,100}$/.test(value)) {
      return 'Should be less than 100 characters long';
    }
    return null;
  },

  category: isNotEmpty('Required'),

  logo: (value: string) => {
    if (value.trim().length === 0) {
      return null;
    } else {
      if (!urlPattern.test(value)) {
        return 'Invalid Logo URL';
      }
      if (/xn--/.test(value) || /[а-яА-ЯЁё]/.test(value)) {
        return 'Phishing or spoofing content detected';
      }
      return null;
    }
  },
  website: (value: string) => {
    if (!value.trim()) {
      return 'Required';
    }
    if (!urlPattern.test(value)) {
      return 'Invalid Website URL';
    }
    if (/xn--/.test(value) || /[а-яА-ЯЁё]/.test(value)) {
      return 'Phishing or spoofing content detected';
    }
    return null;
  },
  dappSocial: {
    twitter: (value: string) => {
      if (!value.trim()) {
        return 'Required';
      }
      if (/\s/.test(value)) {
        return 'No spaces allowed';
      }
      if (!/^[A-Za-z0-9_]*$/.test(value)) {
        return 'Should only contain letters, numbers and underscores';
      }
      if (!/^.{1,25}$/.test(value)) {
        return 'Should be less than 25 characters long';
      }
      // This is for Discord Username
      /*       const validateLengthBetween = lengthBetween(4, 15)(value);
      if (validateLengthBetween) return validateLengthBetween;
      */
      return null;
    },

    discord: (value: string) => {
      if (value.trim().length === 0) {
        return null;
      } else {
        if (/\s/.test(value)) {
          return 'No spaces allowed';
        }
        if (!/^[A-Za-z0-9_.]*$/.test(value)) {
          return 'Should only contain letters, numbers, underscores and periods';
        }
        if (/(\.{2,})/.test(value)) {
          return 'Cannot contain 2 consecutive periods';
        }
        const validateLengthBetween = lengthBetween(2, 32)(value);
        if (validateLengthBetween) return validateLengthBetween;
      }
      return null;
    },

    telegram: (value: string) => {
      if (value.trim().length === 0) {
        return null;
      } else {
        if (/\s/.test(value)) {
          return 'No spaces allowed';
        }
        if (!/^[A-Za-z]/.test(value)) {
          return 'Should start with a letter';
        }
        if (!/^[A-Za-z0-9_]*$/.test(value)) {
          return 'Should only contain letters, numbers and underscores';
        }
        const validateLengthBetween = lengthBetween(5, 32)(value);
        if (validateLengthBetween) return validateLengthBetween;
      }
      return null;
    },

    youtube: (value: string) => {
      if (value.trim().length === 0) {
        return null;
      } else {
        if (/\s/.test(value)) {
          return 'No spaces allowed';
        }
        if (!/^[A-Za-z0-9_-]/.test(value)) {
          return 'Should start with a letter, number, underscore or hyphen';
        }
        if (!/^[A-Za-z0-9_.-]*$/.test(value)) {
          return 'Should only contain letters, numbers, underscores, periods and hyphen';
        }
        const validateLengthBetween = lengthBetween(4, 15)(value);
        if (validateLengthBetween) return validateLengthBetween;
      }
      return null;
    },

    github: (value: string) => {
      if (value.trim().length === 0) {
        return null;
      } else {
        if (/\s/.test(value)) {
          return 'No spaces allowed';
        }
        if (!/^[A-Za-z0-9](.*[A-Za-z0-9])?$/.test(value)) {
          return 'Should start with a letter or number and cannot begin or end with a hyphen';
        }

        if (!/^[A-Za-z0-9]+([-]?[A-Za-z0-9]+)*$/i.test(value)) {
          return 'Should only contain letters, numbers or single hyphen';
        }
        const validateLengthBetween = lengthBetween(5, 39)(value);
        if (validateLengthBetween) return validateLengthBetween;
      }
      return null;
    },
  },
};
