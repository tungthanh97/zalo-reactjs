import { loginValues } from './loginValues';
import { UserFormLogin } from 'Types';
import { Formik, Form, FastField } from 'formik';
import { useNavigate } from 'react-router-dom';
import { Divider, Col, Button } from 'antd';
import { LockFilled, PhoneFilled } from '@ant-design/icons';
import React from 'react';
import { autoLoginAsync, logInAsync, useAppDispatch } from 'Stores';
import { TextField, NumberField } from 'Components';

export const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const handleSubmit = (values: UserFormLogin) => {
    dispatch(logInAsync(values));
  };
  const goToPhoneVerify = () => {
    navigate('/account/register');
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

      <Formik
        initialValues={loginValues.initial}
        validationSchema={loginValues.validationSchema}
        onSubmit={(values: UserFormLogin) => handleSubmit(values)}
      >
        <Form>
          <Divider>
            <FastField
              label="Phone"
              name="phone"
              placeholder="Enter your phone number"
              prefix={<PhoneFilled />}
              component={TextField}
            />

            <FastField
              label="Password"
              name="password"
              placeholder="Enter your password"
              prefix={<LockFilled />}
              component={TextField}
            />
          </Divider>
          <Col span={24}>
            <br />
            <Button type="primary" htmlType="submit" block>
              Login
            </Button>
          </Col>
          <Button type="primary" onClick={goToPhoneVerify}>
            Register
          </Button>
        </Form>
      </Formik>
    </div>
  );
};
