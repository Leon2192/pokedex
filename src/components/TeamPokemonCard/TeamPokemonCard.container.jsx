import { useCallback } from 'react';
import { buildPokemonDetailPath } from '@/routes';
import TeamPokemonCard from './TeamPokemonCard';

const TeamPokemonCardContainer = ({ onRemove, pokemon, slotIndex }) => {
  const detailPath = buildPokemonDetailPath(pokemon.name);
  const imageAlt = `${pokemon.displayName} team sprite`;

  const handleRemove = useCallback(() => {
    onRemove(pokemon);
  }, [onRemove, pokemon]);

  return (
    <TeamPokemonCard
      detailPath={detailPath}
      imageAlt={imageAlt}
      onRemove={handleRemove}
      pokemon={pokemon}
      slotIndex={slotIndex}
    />
  );
};

export default TeamPokemonCardContainer;
