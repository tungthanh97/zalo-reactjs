import { PhoneVerify, RegisterInfo } from './UI';
import React from 'react';

export const Register = () => {
  const [phone, setPhone] = React.useState<string>('+84981449866');
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
