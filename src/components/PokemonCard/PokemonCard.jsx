import React from 'react';
import {
  Card,
  Content,
  Header,
  Image,
  ImageFrame,
  Number,
  Title,
  TypeBadge,
  Types,
} from './PokemonCard.styled';

const PokemonCard = ({ detailPath, imageAlt, pokemon }) => (
  <Card
    to={detailPath}
    aria-label={`Ver detalle de ${pokemon.displayName}`}
    data-testid="pokemon-card"
  >
    <Header>
      <Number>{pokemon.number}</Number>
      <Title>{pokemon.displayName}</Title>
    </Header>

    <ImageFrame>
      {pokemon.sprite ? <Image src={pokemon.sprite} alt={imageAlt} loading="lazy" /> : null}
    </ImageFrame>

    <Content>
      <Types aria-label={`Tipos de ${pokemon.displayName}`}>
        {pokemon.types.map((type) => (
          <TypeBadge key={type.name} $color={type.color}>
            {type.displayName}
          </TypeBadge>
        ))}
      </Types>
    </Content>
  </Card>
);

export default React.memo(PokemonCard);
