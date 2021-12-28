import { loginValues } from './loginValues';
import { UserFormLogin } from 'Types';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { useNavigate } from 'react-router-dom';
import { Divider, Row } from 'antd';
import React from 'react';
import jwt_decode from 'jwt-decode';
import { logInAsync, useAppDispatch } from 'Stores';

export const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const handleSubmit = (values: UserFormLogin) => {
    dispatch(logInAsync(values));
  };
  const goToRegister = () => {
    navigate('/account/register');
  };
  React.useEffect(() => {
    const refreshToken = localStorage.getItem('refresh_token');
    if (refreshToken) {
      const decoded = jwt_decode(refreshToken);
      console.log('payload token', decoded);
    }
  }, []);

  return (
    <div>
      <h1>Login</h1>
      <button onClick={goToRegister}>Register</button>
      <Formik
        initialValues={loginValues.initial}
        validationSchema={loginValues.validationSchema}
        onSubmit={(values: UserFormLogin) => handleSubmit(values)}
      >
        <Form>
          <Divider>
            <Row gutter={[0, 8]}>
              <label htmlFor="username">Username</label>

              <Field name="username" placeholder="Username" />
              <ErrorMessage component="div" name="username" />
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
