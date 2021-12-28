import * as Yup from 'yup';
export const RegisterValues = {
  initial: {
    username: '',
    email: '',
    password: '',
  },
  validationSchema: Yup.object().shape({
    username: Yup.string().required('Required Username'),
    email: Yup.string().email('Email is required'),
    password: Yup.string().min(8, 'Too short!').required('Required password'),
  }),
};
