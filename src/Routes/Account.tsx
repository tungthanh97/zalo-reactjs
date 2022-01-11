import { Route, Routes } from 'react-router-dom';
import { useNavigate } from 'react-router';
import { Spin } from 'antd';
import { useIsLoggedIn, useUserLoading } from 'Hooks';
import { Login, Register } from 'Pages';

export const Account = () => {
  const isLoading = useUserLoading();
  const isLoggedIn = useIsLoggedIn();
  const navigate = useNavigate();
  if (isLoggedIn) {
    navigate('/chat');
  }

  return (
    <Spin spinning={isLoading}>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Routes>
    </Spin>
  );
};
