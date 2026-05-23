import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const AppChrome = styled.div`
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.background};
`;

export const Header = styled.header`
  position: sticky;
  top: 0;
  z-index: 20;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  background: rgba(255, 255, 255, 0.94);
  backdrop-filter: blur(10px);
`;

export const Shell = styled.div`
  width: min(100% - 32px, ${({ theme }) => theme.layout.maxWidth});
  min-height: 64px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;

  @media (max-width: 780px) {
    flex-wrap: wrap;
    justify-content: flex-start;
    padding: 10px 0;
    gap: 10px 14px;
  }

  @media (max-width: 640px) {
    width: min(100% - 24px, ${({ theme }) => theme.layout.maxWidth});
    min-height: 60px;
    gap: 12px;
  }
`;

export const Brand = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  flex: 0 0 auto;
  font-size: 1.06rem;
  font-weight: 800;
`;

export const BrandMark = styled.span`
  width: 28px;
  height: 28px;
  border: 2px solid ${({ theme }) => theme.colors.text};
  border-radius: 50%;
  background: linear-gradient(
    to bottom,
    ${({ theme }) => theme.colors.primary} 0 48%,
    ${({ theme }) => theme.colors.text} 48% 54%,
    #ffffff 54% 100%
  );
  position: relative;

  &::after {
    content: '';
    width: 8px;
    height: 8px;
    border: 2px solid ${({ theme }) => theme.colors.text};
    border-radius: 50%;
    background: #ffffff;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

export const Nav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 6px;
  overflow-x: auto;

  @media (max-width: 780px) {
    order: 3;
    width: 100%;
    justify-content: flex-start;
  }
`;

export const NavItem = styled(Link)`
  min-height: 36px;
  padding: 8px 12px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: ${({ theme }) => theme.radii.md};
  color: ${({ $isActive, theme }) =>
    $isActive ? theme.colors.primaryDark : theme.colors.textMuted};
  font-size: 0.94rem;
  font-weight: 700;
  background: ${({ $isActive, theme }) => ($isActive ? theme.colors.surfaceMuted : 'transparent')};

  &:hover {
    color: ${({ theme }) => theme.colors.primaryDark};
    background: ${({ theme }) => theme.colors.surfaceMuted};
  }
`;

export const Main = styled.main`
  width: min(100% - 32px, ${({ theme }) => theme.layout.maxWidth});
  margin: 0 auto;
  padding: 32px 0 56px;

  @media (max-width: 640px) {
    width: min(100% - 24px, ${({ theme }) => theme.layout.maxWidth});
    padding-top: 24px;
  }
`;

export const StatusPill = styled.div`
  min-height: 32px;
  padding: 5px 10px;
  display: inline-flex;
  align-items: center;
  gap: 7px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  color: ${({ $isOnline, theme }) => ($isOnline ? theme.colors.success : theme.colors.warning)};
  background: ${({ theme }) => theme.colors.surface};
  font-size: 0.82rem;
  font-weight: 900;
  white-space: nowrap;
`;

export const StatusDot = styled.span`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${({ $isOnline, theme }) =>
    $isOnline ? theme.colors.success : theme.colors.warning};
`;
