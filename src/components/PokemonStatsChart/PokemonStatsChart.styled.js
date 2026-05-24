import styled from 'styled-components';

export const ChartPanel = styled.div`
  width: 100%;
  min-width: 0;
  height: 300px;

  .recharts-cartesian-axis-tick-value,
  .recharts-label {
    fill: ${({ theme }) => theme.colors.textMuted};
    font-size: 0.78rem;
    font-weight: 800;
  }

  .recharts-tooltip-wrapper {
    outline: none;
  }

  @media (max-width: 520px) {
    height: 340px;
  }
`;
