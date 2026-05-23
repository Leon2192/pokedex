import PokemonGrid from './PokemonGrid';

const PokemonGridContainer = ({ lastPokemonRef, pokemons }) => (
  <PokemonGrid lastPokemonRef={lastPokemonRef} pokemonCount={pokemons.length} pokemons={pokemons} />
);

export default PokemonGridContainer;
