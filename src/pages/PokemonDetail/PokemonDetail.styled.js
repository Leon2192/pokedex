import { Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';

const shimmer = keyframes`
  0% {
    background-position: -240px 0;
  }

  100% {
    background-position: 240px 0;
  }
`;

export const Page = styled.section`
  display: grid;
  gap: 22px;
`;

export const Actions = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;

  @media (max-width: 520px) {
    align-items: stretch;
    flex-direction: column;
  }
`;

export const BackButton = styled.button`
  min-height: 42px;
  padding: 0 16px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  color: ${({ theme }) => theme.colors.text};
  background: ${({ theme }) => theme.colors.surface};
  font-weight: 800;

  &:hover:not(:disabled) {
    border-color: ${({ theme }) => theme.colors.textMuted};
  }

  &:disabled {
    cursor: wait;
    opacity: 0.64;
  }
`;

export const ActionButton = styled.button`
  min-height: 42px;
  padding: 0 16px;
  border: 0;
  border-radius: ${({ theme }) => theme.radii.md};
  color: #ffffff;
  background: ${({ $isActive, theme }) => ($isActive ? theme.colors.text : theme.colors.primary)};
  font-weight: 800;

  &:hover:not(:disabled) {
    background: ${({ $isActive, theme }) =>
      $isActive ? theme.colors.textMuted : theme.colors.primaryDark};
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.7;
  }
`;

export const DetailGrid = styled.div`
  display: grid;
  grid-template-columns: minmax(280px, 0.82fr) minmax(320px, 1.18fr);
  gap: 22px;

  @media (max-width: 880px) {
    grid-template-columns: 1fr;
  }
`;

export const HeroPanel = styled.article`
  min-width: 0;
  padding: 24px;
  display: grid;
  gap: 16px;
  align-content: start;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.colors.surface};
  box-shadow: ${({ theme }) => theme.shadow.card};
`;

export const Subtitle = styled.span`
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 0.95rem;
  font-weight: 900;
`;

export const Title = styled.h1`
  margin: 0;
  font-size: clamp(2rem, 5vw, 3.8rem);
  line-height: 1;
`;

export const Types = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

export const TypeBadge = styled.span`
  min-height: 28px;
  padding: 5px 10px;
  display: inline-flex;
  align-items: center;
  border-radius: ${({ theme }) => theme.radii.sm};
  color: #ffffff;
  background: ${({ $color }) => $color};
  font-size: 0.8rem;
  font-weight: 900;
`;

export const HeroImage = styled.img`
  width: min(340px, 88%);
  aspect-ratio: 1;
  justify-self: center;
  object-fit: contain;
`;

export const MainPanel = styled.div`
  min-width: 0;
  display: grid;
  gap: 18px;
`;

export const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

export const InfoItem = styled.div`
  min-height: 92px;
  padding: 16px;
  display: grid;
  align-content: center;
  gap: 6px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.colors.surface};
`;

export const InfoLabel = styled.span`
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 0.8rem;
  font-weight: 900;
`;

export const InfoValue = styled.strong`
  font-size: 1.35rem;
`;

export const Panel = styled.section`
  min-width: 0;
  padding: 18px;
  display: grid;
  gap: 14px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.colors.surface};
`;

export const PanelTitle = styled.h2`
  margin: 0;
  font-size: 1.08rem;
`;

export const AbilityList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

export const AbilityBadge = styled.span`
  min-height: 32px;
  padding: 6px 10px;
  display: inline-flex;
  align-items: center;
  border-radius: ${({ theme }) => theme.radii.sm};
  color: ${({ theme }) => theme.colors.text};
  background: ${({ theme }) => theme.colors.surfaceMuted};
  font-size: 0.86rem;
  font-weight: 800;
`;

export const VariantsGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

export const VariantBadge = styled(Link)`
  min-height: 32px;
  padding: 6px 10px;
  display: inline-flex;
  align-items: center;
  border: 1px solid
    ${({ $isCurrent, theme }) => ($isCurrent ? theme.colors.primary : theme.colors.border)};
  border-radius: ${({ theme }) => theme.radii.sm};
  color: ${({ $isCurrent, theme }) => ($isCurrent ? theme.colors.primaryDark : theme.colors.text)};
  background: ${({ theme }) => theme.colors.surfaceMuted};
  font-size: 0.86rem;
  font-weight: 900;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

export const StatsList = styled.div`
  display: grid;
  gap: 12px;
`;

export const StatItem = styled.div`
  display: grid;
  gap: 7px;
`;

export const StatHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
`;

export const StatName = styled.span`
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 0.86rem;
  font-weight: 900;
`;

export const StatValue = styled.strong`
  font-size: 0.9rem;
`;

export const StatBar = styled.div`
  width: 100%;
  height: 10px;
  overflow: hidden;
  border-radius: 999px;
  background: ${({ theme }) => theme.colors.surfaceMuted};
`;

export const StatFill = styled.span`
  width: ${({ $percentage }) => `${$percentage}%`};
  height: 100%;
  display: block;
  border-radius: inherit;
  background: ${({ theme }) => theme.colors.secondary};
`;

export const SpritesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 12px;
`;

export const SpriteCard = styled.figure`
  min-width: 0;
  min-height: 132px;
  margin: 0;
  padding: 12px;
  display: grid;
  place-items: center;
  gap: 8px;
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.colors.surfaceMuted};
`;

export const SpriteImage = styled.img`
  width: 82px;
  height: 82px;
  object-fit: contain;
`;

export const SpriteLabel = styled.figcaption`
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 0.8rem;
  font-weight: 900;
`;

export const SkeletonGrid = styled.div`
  display: grid;
  grid-template-columns: minmax(280px, 0.82fr) minmax(320px, 1.18fr);
  gap: 22px;

  @media (max-width: 880px) {
    grid-template-columns: 1fr;
  }
`;

export const SkeletonBlock = styled.div`
  min-height: ${({ $height }) => $height ?? '260px'};
  border-radius: ${({ theme }) => theme.radii.md};
  background: linear-gradient(
    90deg,
    ${({ theme }) => theme.colors.surfaceMuted} 0%,
    #f8fafc 45%,
    ${({ theme }) => theme.colors.surfaceMuted} 90%
  );
  background-size: 480px 100%;
  animation: ${shimmer} 1.1s ease-in-out infinite;
`;
