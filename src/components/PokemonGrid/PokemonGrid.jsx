import React from 'react';
import PokemonCard from '@/components/PokemonCard';
import { Grid, GridItem } from './PokemonGrid.styled';

const PokemonGrid = ({ lastPokemonRef, pokemons, pokemonCount }) => (
  <Grid aria-label={`${pokemonCount} Pokemon loaded`}>
    {pokemons.map((pokemon, index) => {
      const isLastItem = index === pokemons.length - 1;

      return (
        <GridItem key={pokemon.id} ref={isLastItem ? lastPokemonRef : null}>
          <PokemonCard pokemon={pokemon} />
        </GridItem>
      );
    })}
  </Grid>
);

export default React.memo(PokemonGrid);
