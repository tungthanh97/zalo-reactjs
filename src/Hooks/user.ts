import { useAppSelector } from 'Stores';

export const useIsLoggedIn = () => {
  return useAppSelector((state) => state.user.isLoggedIn);
};

export const useUserError = () => {
  return useAppSelector((state) => state.user.error);
};

export const useUserLoading = () => {
  return useAppSelector((state) => state.user.isLoading);
};
