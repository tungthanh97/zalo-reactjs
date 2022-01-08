import { Formik, Field, Form, ErrorMessage } from 'formik';
import { useNavigate } from 'react-router-dom';
import { Divider, Row } from 'antd';
import { phoneVerifyValues } from './phoneVerifyValues';
import { authService } from 'Services';

export const PhoneVerify = ({
  goToRegister,
}: {
  goToRegister: (phone: string) => void;
}) => {
  const navigate = useNavigate();
  const goToLogin = () => {
    navigate('/account/login');
  };

  const handleSubmit = async (values: { phone: string }) => {
    const { phone } = values;
    await authService.verifyOTP(phone);
    goToRegister(phone);
  };

  return (
    <div>
      <h1>Enter your phone number</h1>

      <button onClick={goToLogin}>Login</button>
      <Formik
        initialValues={phoneVerifyValues.initial}
        validationSchema={phoneVerifyValues.validationSchema}
        onSubmit={(values: { phone: string }) => handleSubmit(values)}
      >
        <Form>
          <Divider>
            <Row>
              <label htmlFor="phone">Phone</label>
              <Field name="phone" placeholder="phone" />
              <ErrorMessage component="div" name="phone" />
            </Row>
          </Divider>
          <button type="submit">Submit</button>
        </Form>
      </Formik>
    </div>
  );
};
