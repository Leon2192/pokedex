import styled, { keyframes } from 'styled-components';

const shimmer = keyframes`
  0% {
    background-position: -180px 0;
  }

  100% {
    background-position: 180px 0;
  }
`;

const SkeletonBlock = styled.div`
  border-radius: ${({ theme }) => theme.radii.sm};
  background: linear-gradient(
    90deg,
    ${({ theme }) => theme.colors.surfaceMuted} 0%,
    #f8fafc 45%,
    ${({ theme }) => theme.colors.surfaceMuted} 90%
  );
  background-size: 360px 100%;
  animation: ${shimmer} 1.1s ease-in-out infinite;
`;

export const Card = styled.article`
  min-height: 286px;
  padding: 16px;
  display: grid;
  grid-template-rows: auto 1fr auto;
  gap: 14px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.colors.surface};
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
`;

export const Line = styled(SkeletonBlock)`
  width: 58%;
  height: 18px;
`;

export const ShortLine = styled(SkeletonBlock)`
  width: 44px;
  height: 16px;
`;

export const ImageBlock = styled(SkeletonBlock)`
  min-height: 150px;
`;

export const BodyLine = styled(SkeletonBlock)`
  width: 72%;
  height: 28px;
`;
