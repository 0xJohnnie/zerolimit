import { UseFormReturnType } from '@mantine/form';

export interface DappForm {
  dateAdded: Date | number;
  dappName: string;
  category: string;
  logo: string;
  website: string;
  twitter: string;
  discord: string;
  telegram: string;
  youtube: string;
  github: string;
}

export interface FormInputItem {
  label: string;
  placeholder: string;
  icon: React.ReactNode;
  key: string;
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
