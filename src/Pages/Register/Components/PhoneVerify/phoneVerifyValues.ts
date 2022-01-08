import * as Yup from 'yup';

export const phoneVerifyValues = {
  initial: {
    phone: '+84',
  },
  validationSchema: Yup.object().shape({
    phone: Yup.string()
      .required('Phone Number required')
      .matches(/((84|0)[3|5|7|8|9])+([0-9]{8})\b/g, 'Invalid phone number'),
  }),
};
