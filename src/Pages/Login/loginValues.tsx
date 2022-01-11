import * as Yup from 'yup';

export const loginValues = {
  initial: {
    phone: '',
    password: '',
  },
  validationSchema: Yup.object().shape({
    phone: Yup.string()
      .required('Phone Number is required')
      .matches(/((84|0)[3|5|7|8|9])+([0-9]{8})\b/g, 'Invalid phone number'),
    password: Yup.string()
      .min(8, 'Password is too short!')
      .max(50, 'Password is too short!')
      .required('Password required'),
  }),
};
