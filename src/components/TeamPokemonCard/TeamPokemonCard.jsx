import React from 'react';
import {
  Card,
  DetailLink,
  Header,
  Image,
  ImageFrame,
  Meta,
  Number,
  RemoveButton,
  Slot,
  Title,
  TypeBadge,
  Types,
} from './TeamPokemonCard.styled';

const TeamPokemonCard = ({ detailPath, imageAlt, onRemove, pokemon, slotIndex }) => (
  <Card data-team-slot={slotIndex}>
    <Header>
      <Slot>Espacio {slotIndex + 1}</Slot>
      <RemoveButton type="button" onClick={onRemove}>
        Quitar
      </RemoveButton>
    </Header>

    <DetailLink to={detailPath} aria-label={`Ver detalle de ${pokemon.displayName}`}>
      <ImageFrame>
        {pokemon.sprite ? <Image src={pokemon.sprite} alt={imageAlt} /> : null}
      </ImageFrame>

      <Meta>
        <Number>{pokemon.number}</Number>
        <Title>{pokemon.displayName}</Title>
      </Meta>

      <Types aria-label={`Tipos de ${pokemon.displayName}`}>
        {(pokemon.types ?? []).map((type) => (
          <TypeBadge key={type.name} $color={type.color}>
            {type.displayName}
          </TypeBadge>
        ))}
      </Types>
    </DetailLink>
  </Card>
);

export default React.memo(TeamPokemonCard);
