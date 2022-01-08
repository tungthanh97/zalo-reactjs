import { PhoneVerify, RegisterInfo } from './Components';
import React from 'react';

export const Register = () => {
  const [phone, setPhone] = React.useState<string>('');
  const goToRegister = (phone: string) => {
    setPhone(phone);
  };

  const RegisterComponent = phone ? (
    <RegisterInfo phone={phone} />
  ) : (
    <PhoneVerify goToRegister={goToRegister} />
  );

  return RegisterComponent;
};
