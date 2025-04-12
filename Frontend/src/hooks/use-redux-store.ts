
import { useEffect } from 'react';
import { useAppSelector } from '@/store/redux';

// Hook to ensure the redux store is properly loaded from localStorage
export const useReduxStore = () => {
  const isLoaded = useAppSelector((state) => Boolean(state.resume));
  
  useEffect(() => {
    // You can add additional initialization logic here if needed
  }, [isLoaded]);
  
  return { isLoaded };
};
