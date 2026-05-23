import styled from 'styled-components';
import { Grid as PokemonGridLayout } from '@/components/PokemonGrid/PokemonGrid.styled';

export const Page = styled.section`
  display: grid;
  gap: 24px;
`;

export const Header = styled.header`
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto auto;
  align-items: flex-end;
  gap: 20px;

  @media (max-width: 640px) {
    align-items: flex-start;
    grid-template-columns: 1fr;
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

export const Stats = styled.div`
  min-height: 38px;
  padding: 8px 12px;
  display: inline-flex;
  align-items: center;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  color: ${({ theme }) => theme.colors.textMuted};
  background: ${({ theme }) => theme.colors.surface};
  font-size: 0.9rem;
  font-weight: 800;
  white-space: nowrap;
`;

export const HeaderMeta = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

export const SkeletonGrid = styled(PokemonGridLayout)`
  margin-top: 0;
`;

export const EmptyState = styled.div`
  min-height: 180px;
  padding: 28px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 18px;
  border: 1px dashed ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  background: rgba(255, 255, 255, 0.55);

  @media (max-width: 560px) {
    align-items: flex-start;
    flex-direction: column;
  }
`;

export const EmptyStateBody = styled.div`
  display: grid;
  gap: 8px;

  h2,
  p {
    margin: 0;
  }

  p {
    color: ${({ theme }) => theme.colors.textMuted};
    line-height: 1.6;
  }
`;

export const EmptyStateAction = styled.button`
  min-height: 42px;
  padding: 0 16px;
  border: 0;
  border-radius: ${({ theme }) => theme.radii.md};
  color: #ffffff;
  background: ${({ theme }) => theme.colors.primary};
  font-weight: 900;

  &:hover {
    background: ${({ theme }) => theme.colors.primaryDark};
  }
`;

export const EndState = styled.div`
  min-height: 44px;
  padding: 10px 14px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  justify-self: center;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  color: ${({ theme }) => theme.colors.textMuted};
  background: ${({ theme }) => theme.colors.surface};
  font-size: 0.9rem;
  font-weight: 800;
`;
