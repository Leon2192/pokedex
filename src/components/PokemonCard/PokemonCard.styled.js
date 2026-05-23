import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const Card = styled(Link)`
  min-height: 286px;
  padding: 16px;
  display: grid;
  grid-template-rows: auto 1fr auto;
  gap: 14px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.colors.surface};
  box-shadow: ${({ theme }) => theme.shadow.card};
  transition:
    border-color 160ms ease,
    transform 160ms ease,
    box-shadow 160ms ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    transform: translateY(-2px);
  }

  &:focus-visible {
    outline: 3px solid rgba(37, 99, 235, 0.28);
    outline-offset: 3px;
  }
`;

export const Header = styled.div`
  min-width: 0;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
`;

export const Number = styled.span`
  flex: 0 0 auto;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 0.84rem;
  font-weight: 800;
`;

export const Title = styled.h2`
  min-width: 0;
  margin: 0;
  text-align: right;
  font-size: 1.02rem;
  line-height: 1.2;
  overflow-wrap: anywhere;
`;

export const ImageFrame = styled.div`
  min-height: 150px;
  display: grid;
  place-items: center;
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.colors.surfaceMuted};
`;

export const Image = styled.img`
  width: min(150px, 80%);
  aspect-ratio: 1;
  object-fit: contain;
`;

export const Content = styled.div`
  min-width: 0;
`;

export const Types = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

export const TypeBadge = styled.span`
  min-height: 26px;
  padding: 5px 9px;
  display: inline-flex;
  align-items: center;
  border-radius: ${({ theme }) => theme.radii.sm};
  color: #ffffff;
  background: ${({ $color }) => $color};
  font-size: 0.78rem;
  font-weight: 800;
`;
