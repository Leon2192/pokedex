import { useCallback, useEffect, useRef, useState } from 'react';

const DEFAULT_TOAST_DURATION = 2600;

export const useToast = () => {
  const [toast, setToast] = useState(null);
  const toastTimeoutRef = useRef(null);

  const clearToastTimer = useCallback(() => {
    if (toastTimeoutRef.current) {
      window.clearTimeout(toastTimeoutRef.current);
      toastTimeoutRef.current = null;
    }
  }, []);

  const hideToast = useCallback(() => {
    clearToastTimer();

    setToast(null);
  }, [clearToastTimer]);

  const showToast = useCallback(
    (message, tone = 'success', duration = DEFAULT_TOAST_DURATION) => {
      hideToast();

      setToast({
        id: Date.now(),
        message,
        tone,
      });

      toastTimeoutRef.current = window.setTimeout(() => {
        setToast(null);
        toastTimeoutRef.current = null;
      }, duration);
    },
    [hideToast]
  );

  useEffect(() => clearToastTimer, [clearToastTimer]);

  return {
    hideToast,
    showToast,
    toast,
  };
};
