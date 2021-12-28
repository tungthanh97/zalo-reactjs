import React from 'react';
import { useIsLoggedIn } from 'Hooks';
import { Navigate, Outlet } from 'react-router-dom';

export const PrivateRoute = () => {
  const isLoggedIn = useIsLoggedIn();

  return isLoggedIn ? <Outlet /> : <Navigate to="/account/login" />;
};
