import React from 'react';
import { ToastBox } from './Toast.styled';

const Toast = ({ toast }) => (
  <ToastBox key={toast.id} $tone={toast.tone} role="status" aria-live="polite">
    {toast.message}
  </ToastBox>
);

export default React.memo(Toast);
