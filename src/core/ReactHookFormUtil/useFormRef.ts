import {Ref, useImperativeHandle} from 'react';

import {
  FieldValues,
  UseFormReturn,
  UseFormSetFocus,
  UseFormSetValue,
  UseFormSetError,
} from 'react-hook-form';

export type FormRef<V extends FieldValues = any> = {
  setError: UseFormSetError<V>;
  setValue: UseFormSetValue<V>;
  setFocus: UseFormSetFocus<V>;
  getValues(): V;
};

export default function useFormRef<
  V extends FieldValues = FieldValues,
  C = any,
>(form: UseFormReturn<V, C>, ref?: Ref<FormRef<V>>) {
  useImperativeHandle(ref, () => ({
    setError: (...args) => {
      return form.setError(...args);
    },
    setValue: (...args) => {
      return form.setValue(...args);
    },
    setFocus: (...args) => {
      return form.setFocus(...args);
    },
    getValues: () => {
      return form.getValues();
    },
  }));
}
