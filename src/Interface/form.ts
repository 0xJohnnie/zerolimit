import { UseFormReturnType } from '@mantine/form';

export interface DappSocial {
  twitter: string;
  discord: string;
  telegram: string;
  youtube: string;
  github: string;
}

export interface DappForm {
  dateAdded: Date | number;
  dappName: string;
  category: string;
  mainCategory?: string; // Add optional mainCategory field
  logo: string;
  website: string;
  dappSocial: DappSocial;
}

export interface FormInputItem {
  key: string;
  name: string;
  label: string;
  placeholder: string;
  icon: React.ReactNode;
  required?: boolean;
}

export interface NotificationShowHideProps {
  id: string;
  title: string;
  autoCloseDuration: number;
  trueMessage: string;
  falseMessage: string;
}

export interface DataOverwriteModalProps {
  dataOverwriteState: boolean;
  closeDataOverwrite: () => void;
  stopSavingData: () => void;
  mergedFormData: DappForm;
  form: UseFormReturnType<DappForm>;
  showHideNotification: (show: boolean) => void;
  formName: string;
}

export interface ResetFormModalProps {
  resetFormState: boolean;
  closeResetForm: () => void;
  form: UseFormReturnType<DappForm>;
}
