import { loginValues } from './loginValues';
import { UserFormLogin } from 'Types';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { Grid } from '@material-ui/core';

export const Login = () => {
  const handleSubmit = (values: UserFormLogin) => {};
  return (
    <div>
      <h1>Signup</h1>
      <Formik
        initialValues={loginValues.initial}
        validationSchema={loginValues.validationSchema}
        onSubmit={(values: UserFormLogin) => handleSubmit(values)}
      >
        <Form>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <label htmlFor="username">Username</label>

              <Field name="username" placeholder="Username" />
              <ErrorMessage component="div" name="username" />
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
    </div>
  );
};
