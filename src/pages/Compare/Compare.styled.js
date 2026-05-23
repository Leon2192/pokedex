import styled, { keyframes } from 'styled-components';

const shimmer = keyframes`
  0% {
    background-position: -220px 0;
  }

  100% {
    background-position: 220px 0;
  }
`;

const menuEnter = keyframes`
  from {
    opacity: 0;
    transform: translateY(-4px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

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
  max-width: 62ch;
  margin: 12px 0 0;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 1rem;
  line-height: 1.6;
`;

export const Form = styled.form`
  display: grid;
  grid-template-columns: minmax(220px, 1fr) minmax(220px, 1fr) auto;
  align-items: end;
  gap: 16px;
  padding: 18px 0;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};

  @media (max-width: 760px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (max-width: 520px) {
    grid-template-columns: 1fr;
  }
`;

export const Field = styled.div`
  min-width: 0;
  position: relative;
  z-index: ${({ $isOpen }) => ($isOpen ? 5 : 1)};
  display: grid;
  gap: 7px;
`;

export const Label = styled.label`
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 0.82rem;
  font-weight: 900;
`;

export const SelectorInputWrap = styled.div`
  position: relative;
`;

export const SelectorInput = styled.input`
  width: 100%;
  min-height: 48px;
  padding: 0 88px 0 14px;
  border: 1px solid
    ${({ $hasError, theme }) => ($hasError ? theme.colors.primary : theme.colors.border)};
  border-radius: ${({ theme }) => theme.radii.md};
  color: ${({ theme }) => theme.colors.text};
  background: ${({ theme }) => theme.colors.surface};
  box-shadow: 0 1px 0 rgba(23, 32, 51, 0.03);
  font-weight: 800;

  &:focus {
    outline: 2px solid rgba(37, 99, 235, 0.24);
    border-color: ${({ theme }) => theme.colors.secondary};
  }

  &:disabled {
    cursor: wait;
    opacity: 0.7;
  }
`;

export const SelectorClearButton = styled.button`
  min-height: 32px;
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  padding: 0 10px;
  border: 0;
  border-radius: ${({ theme }) => theme.radii.sm};
  color: ${({ theme }) => theme.colors.textMuted};
  background: ${({ theme }) => theme.colors.surfaceMuted};
  font-size: 0.74rem;
  font-weight: 900;

  &:hover:not(:disabled) {
    color: ${({ theme }) => theme.colors.text};
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.65;
  }
`;

export const OptionsMenu = styled.div`
  width: 100%;
  max-height: 286px;
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  overflow-y: auto;
  overscroll-behavior: contain;
  padding: 6px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.colors.surface};
  box-shadow: 0 18px 38px rgba(23, 32, 51, 0.16);
  animation: ${menuEnter} 120ms ease-out;
`;

export const OptionButton = styled.button`
  width: 100%;
  min-height: 56px;
  padding: 8px;
  display: grid;
  grid-template-columns: 40px minmax(0, 1fr) auto;
  align-items: center;
  gap: 10px;
  border: 0;
  border-radius: ${({ theme }) => theme.radii.sm};
  color: ${({ theme }) => theme.colors.text};
  background: ${({ $isSelected, theme }) =>
    $isSelected ? theme.colors.surfaceMuted : 'transparent'};
  text-align: left;

  &:hover,
  &:focus-visible {
    background: ${({ theme }) => theme.colors.surfaceMuted};
    outline: none;
  }
`;

export const OptionImageFrame = styled.span`
  width: 40px;
  height: 40px;
  display: grid;
  place-items: center;
  border-radius: ${({ theme }) => theme.radii.sm};
  background: ${({ theme }) => theme.colors.surfaceMuted};
`;

export const OptionImage = styled.img`
  width: 32px;
  height: 32px;
  object-fit: contain;
`;

export const OptionContent = styled.span`
  min-width: 0;
  display: grid;
  gap: 2px;
`;

export const OptionName = styled.strong`
  overflow: hidden;
  font-size: 0.9rem;
  line-height: 1.15;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const OptionMeta = styled.span`
  overflow: hidden;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 0.76rem;
  font-weight: 800;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const OptionNumber = styled.span`
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 0.76rem;
  font-weight: 900;
`;

export const SelectorMessage = styled.div`
  padding: 14px 10px;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 0.86rem;
  font-weight: 800;
  text-align: center;
`;

export const FieldError = styled.span`
  color: ${({ theme }) => theme.colors.primaryDark};
  font-size: 0.78rem;
  font-weight: 800;
`;

export const CompareButton = styled.button`
  min-height: 42px;
  padding: 0 16px;
  border: 0;
  border-radius: ${({ theme }) => theme.radii.md};
  color: #ffffff;
  background: ${({ theme }) => theme.colors.primary};
  font-weight: 900;

  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.colors.primaryDark};
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.7;
  }

  @media (max-width: 760px) {
    grid-column: 1 / -1;
  }
`;

export const EmptyState = styled.div`
  min-height: 170px;
  padding: 28px;
  display: grid;
  gap: 8px;
  place-items: center;
  border: 1px dashed ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  color: ${({ theme }) => theme.colors.textMuted};
  background: rgba(255, 255, 255, 0.55);
  font-weight: 900;
  text-align: center;
`;

export const EmptyStateTitle = styled.h2`
  margin: 0;
  font-size: 1.35rem;
`;

export const EmptyStateText = styled.p`
  max-width: 52ch;
  margin: 0;
  color: ${({ theme }) => theme.colors.textMuted};
  font-weight: 700;
  line-height: 1.6;
`;

export const ComparisonGrid = styled.section`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 18px;

  @media (max-width: 680px) {
    grid-template-columns: 1fr;
  }
`;

export const ComparisonPanel = styled.article`
  min-width: 0;
  padding: 18px;
  display: grid;
  gap: 14px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.colors.surface};
  box-shadow: ${({ theme }) => theme.shadow.card};
`;

export const PanelHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 0.84rem;
  font-weight: 900;
`;

export const ImageFrame = styled.div`
  min-height: 180px;
  display: grid;
  place-items: center;
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.colors.surfaceMuted};
`;

export const Image = styled.img`
  width: min(180px, 80%);
  aspect-ratio: 1;
  object-fit: contain;
`;

export const PanelTitle = styled.h2`
  min-width: 0;
  margin: 0;
  font-size: clamp(1.35rem, 4vw, 2rem);
  line-height: 1.1;
  overflow-wrap: anywhere;
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

export const StatsPanel = styled.section`
  padding: 18px;
  display: grid;
  gap: 14px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.colors.surface};
`;

export const StatRow = styled.div`
  display: grid;
  grid-template-areas: 'left name right';
  grid-template-columns: minmax(0, 1fr) minmax(88px, 132px) minmax(0, 1fr);
  align-items: center;
  gap: 14px;

  @media (max-width: 620px) {
    grid-template-areas:
      'name'
      'left'
      'right';
    grid-template-columns: 1fr;
    gap: 10px;
    padding: 14px 0;
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};

    &:last-child {
      border-bottom: 0;
    }
  }
`;

export const StatSide = styled.div`
  min-width: 0;
  grid-area: ${({ $side }) => $side};
  display: grid;
  grid-template-columns: 42px minmax(0, 1fr);
  align-items: center;
  gap: 10px;

  @media (max-width: 620px) {
    grid-template-columns: minmax(86px, 1fr) 42px minmax(0, 2fr);
  }
`;

export const StatPokemonLabel = styled.span`
  display: none;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 0.76rem;
  font-weight: 900;
  overflow-wrap: anywhere;

  @media (max-width: 620px) {
    display: block;
  }
`;

export const StatValue = styled.strong`
  color: ${({ $isWinner, theme }) => ($isWinner ? theme.colors.success : theme.colors.textMuted)};
  font-size: 0.92rem;
`;

export const StatName = styled.span`
  grid-area: name;
  color: ${({ theme }) => theme.colors.text};
  font-size: 0.84rem;
  font-weight: 900;
  text-align: center;

  @media (max-width: 620px) {
    font-size: 0.92rem;
    text-align: left;
  }
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

export const SkeletonGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 18px;

  @media (max-width: 680px) {
    grid-template-columns: 1fr;
  }
`;

export const SkeletonBlock = styled.div`
  min-height: 330px;
  border-radius: ${({ theme }) => theme.radii.md};
  background: linear-gradient(
    90deg,
    ${({ theme }) => theme.colors.surfaceMuted} 0%,
    #f8fafc 45%,
    ${({ theme }) => theme.colors.surfaceMuted} 90%
  );
  background-size: 440px 100%;
  animation: ${shimmer} 1.1s ease-in-out infinite;
`;
