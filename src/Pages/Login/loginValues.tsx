import * as Yup from 'yup';

export const loginValues = {
  initial: {
    phone: '',
    password: '',
  },
  validationSchema: Yup.object().shape({
    phone: Yup.string()
      .required('Phone Number is required')
      .matches(/((09|03|07|08|05)+([0-9]{8})\b)/g, 'Invalid phone number'),
    password: Yup.string()
      .min(8, 'Password is too short!')
      .max(50, 'Password is too short!')
      .required('Password required'),
  }),
};
