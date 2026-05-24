import { useCallback } from 'react';
import { buildPokemonDetailPath } from '@/routes';
import TeamPokemonCard from './TeamPokemonCard';

const TeamPokemonCardContainer = ({
  isDragging,
  isDragOver,
  onDragEnd,
  onDragEnter,
  onDragStart,
  onDrop,
  onRemove,
  pokemon,
  slotIndex,
}) => {
  const detailPath = buildPokemonDetailPath(pokemon.name);
  const imageAlt = `Sprite de ${pokemon.displayName} en el equipo`;

  const handleRemove = useCallback(() => {
    onRemove(pokemon);
  }, [onRemove, pokemon]);

  return (
    <TeamPokemonCard
      detailPath={detailPath}
      imageAlt={imageAlt}
      isDragging={isDragging}
      isDragOver={isDragOver}
      onDragEnd={onDragEnd}
      onDragEnter={onDragEnter}
      onDragStart={onDragStart}
      onDrop={onDrop}
      onRemove={handleRemove}
      pokemon={pokemon}
      slotIndex={slotIndex}
    />
  );
};

export default TeamPokemonCardContainer;
