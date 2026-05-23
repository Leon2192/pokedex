import styled from 'styled-components';

export const Grid = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(190px, 1fr));
  gap: 18px;

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

export const GridItem = styled.div`
  min-width: 0;
`;
