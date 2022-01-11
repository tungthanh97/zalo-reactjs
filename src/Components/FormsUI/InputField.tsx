import * as React from 'react';
import { Form, Input } from 'antd';
import { FieldProps } from 'formik';

const FormItem = Form.Item;

export const InputField = ({
  field,
  form: { touched, errors },
  label,
  ...props
}: FieldProps & { label: string }) => {
  const errMsg = touched[field.name] && errors[field.name];

  return (
    <FormItem
      label={label}
      help={errMsg}
      validateStatus={errMsg ? 'error' : undefined}
    >
      <Input {...field} {...props} />
    </FormItem>
  );
};
