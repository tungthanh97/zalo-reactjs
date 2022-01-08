import { loginValues } from './loginValues';
import { UserFormLogin } from 'Types';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { useNavigate } from 'react-router-dom';
import { Divider, Row } from 'antd';
import React from 'react';

import { autoLoginAsync, logInAsync, useAppDispatch } from 'Stores';

export const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const handleSubmit = (values: UserFormLogin) => {
    dispatch(logInAsync(values));
  };
  const goToPhoneVerify = () => {
    navigate('/account/verify-phone');
  };
  React.useEffect(() => {
    const refreshToken = localStorage.getItem('refresh_token');
    if (refreshToken) {
      dispatch(autoLoginAsync(refreshToken));
    }
  }, [dispatch]);

  return (
    <div>
      <h1>Login</h1>
      <button onClick={goToPhoneVerify}>Register</button>
      <Formik
        initialValues={loginValues.initial}
        validationSchema={loginValues.validationSchema}
        onSubmit={(values: UserFormLogin) => handleSubmit(values)}
      >
        <Form>
          <Divider>
            <Row gutter={[0, 8]}>
              <label htmlFor="phone">Phone</label>

              <Field name="phone" placeholder="Phone number" />
              <ErrorMessage component="div" name="phone" />
            </Row>
            <Row gutter={[0, 8]}>
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
