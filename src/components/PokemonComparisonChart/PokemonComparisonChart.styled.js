import styled from 'styled-components';

export const ChartPanel = styled.section`
  min-width: 0;
  padding: 18px;
  display: grid;
  gap: 14px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.colors.surface};
`;

export const ChartTitle = styled.h2`
  margin: 0;
  font-size: 1.05rem;
`;

export const ChartWrap = styled.div`
  width: 100%;
  min-width: 0;
  height: 320px;

  .recharts-cartesian-axis-tick-value,
  .recharts-legend-item-text {
    fill: ${({ theme }) => theme.colors.textMuted};
    font-size: 0.78rem;
    font-weight: 800;
  }

  .recharts-tooltip-wrapper {
    outline: none;
  }

  @media (max-width: 620px) {
    height: 320px;
  }
`;
