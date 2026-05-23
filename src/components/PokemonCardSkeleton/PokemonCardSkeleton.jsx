import React from 'react';
import { BodyLine, Card, Header, ImageBlock, Line, ShortLine } from './PokemonCardSkeleton.styled';

const PokemonCardSkeleton = () => (
  <Card aria-hidden="true">
    <Header>
      <ShortLine />
      <Line />
    </Header>
    <ImageBlock />
    <BodyLine />
  </Card>
);

export default React.memo(PokemonCardSkeleton);
