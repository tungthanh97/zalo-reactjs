import * as Yup from 'yup';

export const phoneVerifyValues = {
  initial: {
    phone: '',
  },
  validationSchema: Yup.object().shape({
    phone: Yup.string()
      .required('Phone Number required')
      .matches(/((84|0)[3|5|7|8|9])+([0-9]{8})\b/g, 'Invalid phone number'),
  }),
};

export const otpValues = {
  initial: {
    otp: '',
  },
  validationSchema: Yup.object().shape({
    otp: Yup.string()
      .required('OTP required')
      .min(6, 'Must be exactly 6 digits')
      .max(6, 'Must be exactly 6 digits'),
  }),
};
