import { ErrorMessage as Error, UserFormRegister } from 'Types';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { registerAsync, useAppDispatch } from 'Stores';
import { useUserError } from 'Hooks';
import { useNavigate } from 'react-router-dom';
import { Divider, Row, message } from 'antd';
import { RegisterValues } from './registerValues';

export const Register = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const goToLogin = () => {
    navigate('/account/login');
  };

  const handleError = (error: Error) => {
    message.warning(error.message);
  };
  const handleSuccess = () => {
    message.success('Register success');
    goToLogin();
  };

  const error = useUserError();
  const handleSubmit = async (values: UserFormRegister) => {
    console.log('Register', values);
    dispatch(registerAsync(values));

    if (error) handleError(error);
    else handleSuccess();
  };

  return (
    <div>
      <h1>Register</h1>

      <button onClick={goToLogin}>Login</button>
      <Formik
        initialValues={RegisterValues.initial}
        validationSchema={RegisterValues.validationSchema}
        onSubmit={(values: UserFormRegister) => handleSubmit(values)}
      >
        <Form>
          <Divider>
            <Row>
              <label htmlFor="username">Username</label>

              <Field name="username" placeholder="Username" />
              <ErrorMessage component="div" name="username" />
            </Row>
            <Row>
              <label htmlFor="phone">Phone</label>

              <Field name="phone" placeholder="phone" />
              <ErrorMessage component="div" name="phone" />
            </Row>
            <Row>
              <label htmlFor="password">Password</label>

              <Field name="password" placeholder="Password" />
              <ErrorMessage component="div" name="password" />
            </Row>
          </Divider>
          <button type="submit">Submit</button>
        </Form>
      </Formik>
    </div>
  );
};
