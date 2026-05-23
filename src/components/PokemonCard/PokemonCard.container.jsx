import { buildPokemonDetailPath } from '@/routes';
import PokemonCard from './PokemonCard';

const PokemonCardContainer = ({ pokemon }) => {
  const imageAlt = `Ilustracion oficial de ${pokemon.displayName}`;
  const detailPath = buildPokemonDetailPath(pokemon.name);

  return <PokemonCard detailPath={detailPath} imageAlt={imageAlt} pokemon={pokemon} />;
};

export default PokemonCardContainer;
