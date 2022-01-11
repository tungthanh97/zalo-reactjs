import { Form, Input } from 'antd';
import { FieldProps } from 'formik';
import { Col, Row } from 'antd';

const FormItem = Form.Item;

export const TextField = ({
  field,
  form: { touched, errors },
  label,
  ...props
}: FieldProps & { label: string }) => {
  const errMsg = touched[field.name] && errors[field.name];

  return (
    <Row gutter={[0, 8]}>
      <Col span={24}>
        <FormItem
          label={label}
          help={errMsg}
          validateStatus={errMsg ? 'error' : undefined}
        >
          <Input {...field} {...props} />
        </FormItem>
      </Col>
    </Row>
  );
};
