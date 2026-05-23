import styled from 'styled-components';

const toneColor = {
  cached: '#64748b',
  fresh: '#16a34a',
  offline: '#f59e0b',
  syncing: '#2563eb',
};

export const Badge = styled.span`
  min-height: 30px;
  padding: 5px 10px;
  display: inline-flex;
  align-items: center;
  gap: 7px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  color: ${({ $tone }) => toneColor[$tone] ?? toneColor.cached};
  background: ${({ theme }) => theme.colors.surface};
  font-size: 0.82rem;
  font-weight: 900;
  white-space: nowrap;
`;

export const Dot = styled.span`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${({ $tone }) => toneColor[$tone] ?? toneColor.cached};
`;
