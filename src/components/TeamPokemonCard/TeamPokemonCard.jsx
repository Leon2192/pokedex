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

const TeamPokemonCard = ({
  detailPath,
  imageAlt,
  isDragging,
  isDragOver,
  onDragEnd,
  onDragEnter,
  onDragStart,
  onDrop,
  onRemove,
  pokemon,
  slotIndex,
}) => (
  <Card
    draggable
    aria-label={`Reordenar ${pokemon.displayName} en el equipo`}
    data-team-slot={slotIndex}
    data-testid="team-card"
    $isDragging={isDragging}
    $isDragOver={isDragOver}
    onDragEnd={onDragEnd}
    onDragEnter={() => onDragEnter(slotIndex)}
    onDragOver={(event) => event.preventDefault()}
    onDragStart={(event) => {
      event.dataTransfer.effectAllowed = 'move';
      event.dataTransfer.setData('text/plain', String(slotIndex));
      onDragStart(slotIndex);
    }}
    onDrop={(event) => {
      event.preventDefault();
      onDrop(slotIndex);
    }}
  >
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
