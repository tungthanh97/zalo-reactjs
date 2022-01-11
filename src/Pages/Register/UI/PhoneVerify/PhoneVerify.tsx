import { Formik, Form, FastField } from 'formik';
import { useNavigate } from 'react-router-dom';
import { Divider } from 'antd';
import { phoneVerifyValues, otpValues } from './phoneVerifyValues';
import firebaseConfig from 'firebase.config';
import {
  ConfirmationResult,
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from 'firebase/auth';
import { TextField } from 'Components';
import { isEmpty } from 'lodash-es';
import { useState } from 'react';
import { initializeApp } from 'firebase/app';

export const PhoneVerify = ({
  goToRegister,
}: {
  goToRegister: (phone: string) => void;
}) => {
  const navigate = useNavigate();
  const [confirmOTP, setConfirmOTP] = useState<ConfirmationResult>();
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const goToLogin = () => {
    navigate('/account/login');
  };
  const didEnterPhone = !isEmpty(phoneNumber);
  initializeApp(firebaseConfig);
  const auth = getAuth();
  const verifyPhone = (phoneNumber: string, recaptcha: RecaptchaVerifier) => {
    signInWithPhoneNumber(auth, phoneNumber, recaptcha)
      .then((confirmationResult) => {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        setConfirmOTP(confirmationResult);
      })
      .catch((error) => {
        console.log('error:', error);
      });
  };
  const createRecaptchaAndVerifyPhone = (phoneNumber: string) => {
    const appVerifier = new RecaptchaVerifier(
      'recaptcha-container',
      {
        size: 'invisible',
      },
      auth,
    );

    verifyPhone(phoneNumber, appVerifier);
  };
  const handlePhoneSubmit = async (values: { phone: string }) => {
    const { phone } = values;
    setPhoneNumber(phone);
    createRecaptchaAndVerifyPhone(phone);
  };
  const handleOTPSubmit = async (values: { otp: string }) => {
    const { otp } = values;
    if (confirmOTP)
      confirmOTP
        .confirm(otp)
        .then((result) => {
          goToRegister(phoneNumber);
        })
        .catch((error) => {
          window.alert(error);
        });
  };

  return (
    <div>
      <h1>Enter your phone number</h1>
      <div id="recaptcha-container"></div>
      <button onClick={goToLogin}>Login</button>

      <Formik
        initialValues={phoneVerifyValues.initial}
        validationSchema={phoneVerifyValues.validationSchema}
        onSubmit={(values: { phone: string }) => handlePhoneSubmit(values)}
      >
        <Form>
          <Divider>
            <FastField
              label="Phone"
              name="phone"
              placeholder="Enter your phone number"
              disabled={didEnterPhone}
              component={TextField}
            />
          </Divider>
          {!didEnterPhone && <button type="submit">Send OTP</button>}
        </Form>
      </Formik>

      {didEnterPhone && (
        <Formik
          initialValues={otpValues.initial}
          validationSchema={otpValues.validationSchema}
          onSubmit={(values: { otp: string }) => handleOTPSubmit(values)}
        >
          <Form>
            <Divider>
              <FastField
                label="OTP"
                name="otp"
                placeholder="Enter your OTP"
                component={TextField}
              />
            </Divider>
            <button type="submit">Submit</button>
          </Form>
        </Formik>
      )}
    </div>
  );
};
