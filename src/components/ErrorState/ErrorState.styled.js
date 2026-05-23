import styled from 'styled-components';

export const StateBox = styled.section`
  width: 100%;
  padding: 28px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.colors.surface};
`;

export const Title = styled.h2`
  margin: 0 0 8px;
  font-size: 1.25rem;
`;

export const Message = styled.p`
  max-width: 64ch;
  margin: 0 0 18px;
  color: ${({ theme }) => theme.colors.textMuted};
`;

export const ActionButton = styled.button`
  min-height: 40px;
  padding: 0 16px;
  border: 0;
  border-radius: ${({ theme }) => theme.radii.md};
  color: #ffffff;
  background: ${({ theme }) => theme.colors.primary};
  font-weight: 800;

  &:hover {
    background: ${({ theme }) => theme.colors.primaryDark};
  }
`;
