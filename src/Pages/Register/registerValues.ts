import * as Yup from 'yup';
export const registerValues = {
  initial: {
    username: '',
    password: '',
    phone: '',
  },
  validationSchema: Yup.object().shape({
    username: Yup.string().required('Username required'),
    password: Yup.string()
      .min(8, 'Password is too short!')
      .max(50, 'Password is too short!')
      .required('Password required'),
  }),
};
