import { useAppSelector } from 'Stores';

export const useGlobalError = () => {
  return useAppSelector((state) => state.global.error);
};

export const useGlobalLoading = () => {
  return useAppSelector((state) => state.global.isLoading);
};
