import styled, { keyframes } from 'styled-components';

const pulse = keyframes`
  0%,
  100% {
    transform: scale(0.82);
    opacity: 0.55;
  }

  50% {
    transform: scale(1);
    opacity: 1;
  }
`;

export const Loader = styled.div`
  min-height: 50vh;
  display: grid;
  place-items: center;
  gap: 10px;
  color: ${({ theme }) => theme.colors.textMuted};
`;

export const LoaderDot = styled.span`
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.primary};
  animation: ${pulse} 0.9s ease-in-out infinite;
`;

export const LoaderText = styled.span`
  font-size: 0.95rem;
  font-weight: 700;
`;
