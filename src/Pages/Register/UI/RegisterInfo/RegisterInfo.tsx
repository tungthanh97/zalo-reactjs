import { ErrorMessage as Error, UserFormRegister } from 'Types';
import { Formik, Form, FastField } from 'formik';
import { registerAsync, useAppDispatch } from 'Stores';
import { useUserError, useUserLoading } from 'Hooks';
import { useNavigate } from 'react-router-dom';
import { Divider, Modal } from 'antd';
import { registerValues } from './registerValues';
import { useCallback, useEffect, useState } from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { TextField } from 'Components';

export const RegisterInfo = ({ phone }: { phone: string }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const error = useUserError();
  const isLoading = useUserLoading();
  const [isRegistered, setIsRegistered] = useState(false);

  const goToLogin = useCallback(() => {
    navigate('/account/login');
  }, [navigate]);

  useEffect(() => {
    const handleError = (error: Error) => {
      setIsRegistered(false);
      Modal.error({
        content: error.message,
      });
    };
    const handleSuccess = () => {
      Modal.success({
        content: 'Đăng ký thành công !',
        onOk: () => {
          goToLogin();
        },
        onCancel: () => {
          goToLogin();
        },
      });
    };
    if (isRegistered) {
      if (!isLoading && !error) handleSuccess();
      if (error) handleError(error);
    }
  }, [error, isLoading, isRegistered, goToLogin]);
  const handleSubmit = async (values: UserFormRegister) => {
    dispatch(registerAsync(values));
    setIsRegistered(true);
  };

  return (
    <div>
      <h1>Register</h1>

      <button onClick={goToLogin}>Login</button>
      <Formik
        initialValues={registerValues.initial}
        validationSchema={registerValues.validationSchema}
        onSubmit={(values: UserFormRegister) => {
          const submitValues: UserFormRegister = {
            username: values.username,
            password: values.password,

            phone,
          };
          handleSubmit(submitValues);
        }}
      >
        <Form>
          <Divider>
            <FastField
              label="Username"
              name="username"
              placeholder="Enter your username"
              prefix={<UserOutlined />}
              component={TextField}
            />

            <FastField
              label="Password"
              name="password"
              placeholder="Enter your password"
              prefix={<LockOutlined />}
              component={TextField}
            />
          </Divider>
          <button type="submit">Submit</button>
        </Form>
      </Formik>
    </div>
  );
};
