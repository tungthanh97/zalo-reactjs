import { ErrorMessage as Error, UserFormRegister } from 'Types';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import React from 'react';
import { useUserError } from 'Hooks';
import { useNavigate } from 'react-router-dom';
import { Divider, Row, message } from 'antd';
import { RegisterValues } from './registerValues';
import { userRegister } from 'Services';
import { saveToken } from 'Utils';

export const Register = () => {
  const navigate = useNavigate();

  const goToLogin = () => {
    navigate('/account/login');
  };

  const handleError = (error: Error) => {
    message.warning(error);
  };
  const handleSuccess = () => {
    message.success('Register success');
    goToLogin();
  };

  const error = useUserError();
  const handleSubmit = async (values: UserFormRegister) => {
    console.log('Register', values);
    const { refreshToken, accessToken } = await userRegister(values);
    console.log('accessToken', accessToken);
    saveToken({ refreshToken, accessToken });
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
              <label htmlFor="email">Email</label>

              <Field name="email" placeholder="Email" />
              <ErrorMessage component="div" name="email" />
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
