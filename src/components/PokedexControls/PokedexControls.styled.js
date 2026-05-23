import styled from 'styled-components';

export const Controls = styled.form`
  display: grid;
  grid-template-columns:
    minmax(180px, 1fr)
    minmax(150px, 190px)
    minmax(170px, 210px)
    auto
    auto;
  align-items: end;
  gap: 14px;
  padding: 18px 0;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};

  @media (max-width: 900px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (max-width: 520px) {
    grid-template-columns: 1fr;
  }
`;

export const Field = styled.div`
  min-width: 0;
  display: grid;
  gap: 7px;
`;

export const Label = styled.label`
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 0.82rem;
  font-weight: 800;
`;

export const Input = styled.input`
  width: 100%;
  min-height: 42px;
  padding: 0 12px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  color: ${({ theme }) => theme.colors.text};
  background: ${({ theme }) => theme.colors.surface};

  &:focus {
    outline: 2px solid rgba(37, 99, 235, 0.24);
    border-color: ${({ theme }) => theme.colors.secondary};
  }
`;

export const Select = styled.select`
  width: 100%;
  min-height: 42px;
  padding: 0 12px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  color: ${({ theme }) => theme.colors.text};
  background: ${({ theme }) => theme.colors.surface};

  &:focus {
    outline: 2px solid rgba(37, 99, 235, 0.24);
    border-color: ${({ theme }) => theme.colors.secondary};
  }
`;

export const ActionButton = styled.button`
  min-height: 42px;
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

export const ResetButton = styled.button`
  min-height: 42px;
  padding: 0 16px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  color: ${({ theme }) => theme.colors.text};
  background: ${({ theme }) => theme.colors.surface};
  font-weight: 800;

  &:hover {
    border-color: ${({ theme }) => theme.colors.textMuted};
  }
`;

export const FieldError = styled.span`
  color: ${({ theme }) => theme.colors.primaryDark};
  font-size: 0.78rem;
  font-weight: 700;
`;
