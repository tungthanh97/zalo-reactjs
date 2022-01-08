import { ErrorMessage as Error, UserFormRegister } from 'Types';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { registerAsync, useAppDispatch } from 'Stores';
import { useUserError, useUserLoading } from 'Hooks';
import { useNavigate } from 'react-router-dom';
import { Divider, Row, Modal } from 'antd';
import { registerValues } from './registerValues';
import React from 'react';

export const RegisterInfo = ({ phone }: { phone: string }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const error = useUserError();
  const isLoading = useUserLoading();
  const [isRegistered, setIsRegistered] = React.useState(false);

  const goToLogin = React.useCallback(() => {
    navigate('/account/login');
  }, [navigate]);

  React.useEffect(() => {
    const handleError = (error: Error) => {
      setIsRegistered(false);
      Modal.success({
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
            code: values.code,
            phone,
          };
          handleSubmit(submitValues);
        }}
      >
        <Form>
          <Divider>
            <Row>
              <label htmlFor="code">Code</label>

              <Field name="code" placeholder="Code" />
              <ErrorMessage component="div" name="code" />
            </Row>

            <Row>
              <label htmlFor="username">Username</label>

              <Field name="username" placeholder="Username" />
              <ErrorMessage component="div" name="username" />
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
