import { Formik, Field, Form, ErrorMessage } from 'formik';
import { useNavigate } from 'react-router-dom';
import { Divider, Row } from 'antd';
import { phoneVerifyValues } from './phoneVerifyValues';
import { authService } from 'Services';
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from 'firebase/auth';
import { google } from 'googleapis';
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: 'AIzaSyCEaN4HEFtmbzMl1M_B5FqcRPY92exKfms',
  authDomain: 'zalo-ac3f8.firebaseapp.com',
  projectId: 'zalo-ac3f8',
  storageBucket: 'zalo-ac3f8.appspot.com',
  messagingSenderId: '982514056972',
  appId: '1:982514056972:web:708f59907b98ec5a6a5329',
  measurementId: 'G-2HQSXFD98V',
};
// Initialize Firebase
initializeApp(firebaseConfig);

export const PhoneVerify = ({
  goToRegister,
}: {
  goToRegister: (phone: string) => void;
}) => {
  const navigate = useNavigate();
  const goToLogin = () => {
    navigate('/account/login');
  };
  const auth = getAuth();

  const onSignInSubmit = (recaptcha: RecaptchaVerifier) => {
    console.log('onSignInSubmit2');
    const phoneNumber = '+84981449866';

    signInWithPhoneNumber(auth, phoneNumber, recaptcha)
      .then((confirmationResult) => {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        const code = window.prompt('your verification code:') || '';
        confirmationResult.confirm(code).then((result) => {
          console.log('result', result);
        });
        // ...
      })
      .catch((error) => {
        console.log('error:', error);
        // Error; SMS not sent
        // ...
      });
  };

  const createRecaptcha = () => {
    const appVerifier = new RecaptchaVerifier(
      'recaptcha-container',
      {
        size: 'invisible',
        // callback: () => {
        //   console.log('onCaptchaVerified');
        //   // onSignInSubmit(appVerifier);
        // },
      },
      auth,
    );

    onSignInSubmit(appVerifier);
  };

  const handleSubmit = (values: { phone: string }) => {
    const { phone } = values;
    createRecaptcha();
    // await authService.verifyOTP(phone);
    // goToRegister(phone);
  };

  return (
    <div>
      <h1>Enter your phone number</h1>

      <button onClick={goToLogin}>Login</button>
      <Formik
        initialValues={phoneVerifyValues.initial}
        validationSchema={phoneVerifyValues.validationSchema}
        onSubmit={(values: { phone: string }) => handleSubmit(values)}
      >
        <Form>
          <Divider>
            <div id="recaptcha-container"></div>
            <Row>
              <label htmlFor="phone">Phone</label>
              <Field name="phone" placeholder="phone" />
              <ErrorMessage component="div" name="phone" />
            </Row>
          </Divider>
          <button type="submit">Submit</button>
        </Form>
      </Formik>
    </div>
  );
};
