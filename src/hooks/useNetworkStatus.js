import { useEffect, useState } from 'react';

const getNavigatorOnline = () => (typeof navigator === 'undefined' ? true : navigator.onLine);

export const useNetworkStatus = () => {
  const [isOnline, setIsOnline] = useState(getNavigatorOnline);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
    };
    const handleOffline = () => {
      setIsOnline(false);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return isOnline;
};
