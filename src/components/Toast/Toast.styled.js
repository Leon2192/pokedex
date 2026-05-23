import styled, { keyframes } from 'styled-components';

const slideIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const getToneColor = ({ $tone, theme }) => {
  const colors = {
    error: theme.colors.primaryDark,
    offline: theme.colors.warning,
    online: theme.colors.success,
    success: theme.colors.success,
    warning: theme.colors.warning,
  };

  return colors[$tone] ?? theme.colors.text;
};

export const ToastBox = styled.div`
  position: fixed;
  right: 24px;
  bottom: 24px;
  z-index: 60;
  max-width: min(400px, calc(100vw - 32px));
  padding: 12px 14px;
  border-radius: ${({ theme }) => theme.radii.md};
  color: #ffffff;
  background: ${getToneColor};
  font-size: 0.9rem;
  font-weight: 900;
  box-shadow: ${({ theme }) => theme.shadow.card};
  animation: ${slideIn} 180ms ease-out;

  @media (max-width: 520px) {
    right: 16px;
    bottom: 16px;
  }
`;
