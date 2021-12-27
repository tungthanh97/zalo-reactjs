import { signUpValues } from './signUpValues';
import { UserFormSignUp } from 'Types';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { Grid } from '@material-ui/core';
import { signUp } from 'Services/user';
import React from 'react';
import { AlertMassage } from '@Components';
import { useGlobalError } from '@Hooks/global';

export const Signup = () => {
  const [signUpStatus, setsignUpStatus] = React.useState('');
  const error = useGlobalError();
  const handleSubmit = async (values: UserFormSignUp) => {
    console.log('signUp', values);
    const { refreshToken, accessToken } = await signUp(values);
    console.log('accessToken', accessToken);
    if (error) setsignUpStatus('SignUp failed');
    else setsignUpStatus('SignUp success');
  };
  return (
    <div>
      <h1>Signup</h1>
      <Formik
        initialValues={signUpValues.initial}
        validationSchema={signUpValues.validationSchema}
        onSubmit={(values: UserFormSignUp) => handleSubmit(values)}
      >
        <Form>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <label htmlFor="username">Username</label>

              <Field name="username" placeholder="Username" />
              <ErrorMessage component="div" name="username" />
            </Grid>
            <Grid item xs={12}>
              <label htmlFor="email">Email</label>

              <Field name="email" placeholder="Email" />
              <ErrorMessage component="div" name="email" />
            </Grid>
            <Grid item xs={12}>
              <label htmlFor="password">Password</label>

              <Field name="password" placeholder="Password" />
              <ErrorMessage component="div" name="password" />
            </Grid>
          </Grid>
          <button type="submit">Submit</button>
        </Form>
      </Formik>
      {signUpStatus ? <AlertMassage message={signUpStatus} /> : null}
    </div>
  );
};
