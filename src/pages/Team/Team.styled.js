import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const Page = styled.section`
  display: grid;
  gap: 24px;
`;

export const Header = styled.header`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 20px;

  @media (max-width: 640px) {
    align-items: flex-start;
    flex-direction: column;
  }
`;

export const Title = styled.h1`
  margin: 0;
  font-size: clamp(2rem, 5vw, 3.4rem);
  line-height: 1;
`;

export const Intro = styled.p`
  max-width: 58ch;
  margin: 12px 0 0;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 1rem;
  line-height: 1.6;
`;

export const CountBadge = styled.div`
  min-height: 38px;
  padding: 8px 12px;
  display: inline-flex;
  align-items: center;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  color: ${({ theme }) => theme.colors.textMuted};
  background: ${({ theme }) => theme.colors.surface};
  font-size: 0.9rem;
  font-weight: 900;
  white-space: nowrap;
`;

export const RosterGrid = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(210px, 1fr));
  gap: 18px;

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

export const EmptySlot = styled.div`
  min-height: 320px;
  padding: 14px;
  display: grid;
  place-items: center;
  border: 1px dashed ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  color: ${({ theme }) => theme.colors.textMuted};
  background: rgba(255, 255, 255, 0.5);
`;

export const SlotNumber = styled.span`
  font-size: 0.86rem;
  font-weight: 900;
`;

export const EmptyCard = styled.section`
  min-height: 320px;
  padding: 28px;
  display: grid;
  grid-template-columns: 180px minmax(0, 1fr);
  align-items: center;
  gap: 28px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.colors.surface};
  box-shadow: ${({ theme }) => theme.shadow.card};

  @media (max-width: 700px) {
    grid-template-columns: 1fr;
    text-align: center;
  }
`;

export const EmptyIllustration = styled.div`
  width: 160px;
  aspect-ratio: 1;
  justify-self: center;
  border: 8px solid ${({ theme }) => theme.colors.text};
  border-radius: 50%;
  background: linear-gradient(
    to bottom,
    ${({ theme }) => theme.colors.primary} 0 46%,
    ${({ theme }) => theme.colors.text} 46% 54%,
    #ffffff 54% 100%
  );
  position: relative;

  &::before {
    content: '';
    width: 48px;
    height: 48px;
    border: 7px solid ${({ theme }) => theme.colors.text};
    border-radius: 50%;
    background: ${({ theme }) => theme.colors.surface};
    position: absolute;
    inset: 50% auto auto 50%;
    transform: translate(-50%, -50%);
  }

  &::after {
    content: '';
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background: ${({ theme }) => theme.colors.surfaceMuted};
    position: absolute;
    inset: 50% auto auto 50%;
    transform: translate(-50%, -50%);
  }
`;

export const EmptyBody = styled.div`
  min-width: 0;
  display: grid;
  justify-items: start;
  gap: 12px;

  h2 {
    margin: 0;
    font-size: 1.6rem;
  }

  p {
    max-width: 48ch;
    margin: 0;
    color: ${({ theme }) => theme.colors.textMuted};
    line-height: 1.6;
  }

  @media (max-width: 700px) {
    justify-items: center;
  }
`;

export const BrowseLink = styled(Link)`
  min-height: 42px;
  padding: 0 16px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: ${({ theme }) => theme.radii.md};
  color: #ffffff;
  background: ${({ theme }) => theme.colors.primary};
  font-weight: 900;

  &:hover {
    background: ${({ theme }) => theme.colors.primaryDark};
  }
`;
