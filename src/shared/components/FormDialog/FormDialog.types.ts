import { DialogProps } from '@mui/material';
import type { Omit } from 'type-zoo/types';

import Form from 'form/Form';
import { FormFetcher } from 'form/contexts/FormFetcherContext';
import { FormSubmitter } from 'form/contexts/FormSubmitterContext';

type FormFetcherProps = React.ComponentProps<typeof FormFetcher>;
type FormSubmitterProps = React.ComponentProps<typeof FormSubmitter>;
type FormProps = React.ComponentProps<typeof Form>;

export type FormDialogProps = Omit<DialogProps, 'title' | 'onClose'> & {
  source: string;
  entityId?: FormFetcherProps['entityId'];
  formFetcherProps?: Omit<FormFetcherProps, 'children' | 'source'> & {
    source?: string;
  };
  formSubmitterProps?: Partial<FormSubmitterProps>;
  onClose: () => void;
  title?: React.ReactNode;
  formProps?: FormProps;
  autoFocus?: boolean;
  children: React.ReactNode;
  onSubmit?: (item: any) => void;
  components?: {
    ActionButtons?: React.ReactNode;
  };
};
