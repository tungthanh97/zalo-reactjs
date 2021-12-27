import * as Yup from 'yup';
export const loginValues = {
  initial: {
    username: '',
    password: '',
  },
  validationSchema: Yup.object().shape({
    username: Yup.string()
      .required('Required Username')
      .matches(
        /((09|03|07|08|05)+([0-9]{8})\b)|^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i,
        'Email or phonenumber invalid',
      ),
    password: Yup.string().min(8, 'Too short!').required('Required password'),
  }),
};
