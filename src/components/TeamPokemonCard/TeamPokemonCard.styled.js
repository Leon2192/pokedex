import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const Card = styled.article`
  min-width: 0;
  min-height: 320px;
  padding: 14px;
  display: grid;
  grid-template-rows: auto 1fr;
  gap: 12px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.colors.surface};
  box-shadow: ${({ theme }) => theme.shadow.card};
  cursor: ${({ $isDragging }) => ($isDragging ? 'grabbing' : 'grab')};
  opacity: ${({ $isDragging }) => ($isDragging ? 0.58 : 1)};
  outline: ${({ $isDragOver }) => ($isDragOver ? '3px solid rgba(37, 99, 235, 0.26)' : 'none')};
  outline-offset: 3px;
  transition:
    border-color 160ms ease,
    opacity 160ms ease,
    outline-color 160ms ease,
    transform 160ms ease;

  ${({ $isDragOver }) => ($isDragOver ? 'transform: translateY(-2px);' : '')}

  &:focus-visible {
    outline: 3px solid rgba(37, 99, 235, 0.28);
    outline-offset: 3px;
  }
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
`;

export const Slot = styled.span`
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 0.78rem;
  font-weight: 900;
`;

export const RemoveButton = styled.button`
  min-height: 32px;
  padding: 0 10px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.sm};
  color: ${({ theme }) => theme.colors.primaryDark};
  background: ${({ theme }) => theme.colors.surface};
  font-size: 0.8rem;
  font-weight: 900;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    background: ${({ theme }) => theme.colors.surfaceMuted};
  }
`;

export const DetailLink = styled(Link)`
  min-width: 0;
  display: grid;
  grid-template-rows: 1fr auto auto;
  gap: 12px;

  &:focus-visible {
    outline: 3px solid rgba(37, 99, 235, 0.28);
    outline-offset: 3px;
    border-radius: ${({ theme }) => theme.radii.md};
  }
`;

export const ImageFrame = styled.div`
  min-height: 154px;
  display: grid;
  place-items: center;
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.colors.surfaceMuted};
`;

export const Image = styled.img`
  width: min(150px, 82%);
  aspect-ratio: 1;
  object-fit: contain;
`;

export const Meta = styled.div`
  min-width: 0;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
`;

export const Number = styled.span`
  flex: 0 0 auto;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 0.82rem;
  font-weight: 900;
`;

export const Title = styled.h2`
  min-width: 0;
  margin: 0;
  text-align: right;
  font-size: 1.02rem;
  line-height: 1.2;
  overflow-wrap: anywhere;
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
  font-size: 0.76rem;
  font-weight: 900;
`;
