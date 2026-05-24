import { createSlice } from '@reduxjs/toolkit';

export const MAX_TEAM_SIZE = 6;

const initialState = {
  pokemons: [],
};

const teamSlice = createSlice({
  name: 'team',
  initialState,
  reducers: {
    addPokemon(state, action) {
      const pokemon = action.payload;
      const alreadyExists = state.pokemons.some(
        (teamPokemon) => teamPokemon.id === pokemon.id || teamPokemon.name === pokemon.name
      );

      if (!alreadyExists && state.pokemons.length < MAX_TEAM_SIZE) {
        state.pokemons.push(pokemon);
      }
    },
    removePokemon(state, action) {
      const pokemonIdOrName = action.payload;

      state.pokemons = state.pokemons.filter(
        (pokemon) => pokemon.id !== pokemonIdOrName && pokemon.name !== pokemonIdOrName
      );
    },
    reorderTeam(state, action) {
      const { fromIndex, toIndex } = action.payload;
      const isValidMove =
        Number.isInteger(fromIndex) &&
        Number.isInteger(toIndex) &&
        fromIndex >= 0 &&
        toIndex >= 0 &&
        fromIndex < state.pokemons.length &&
        toIndex < state.pokemons.length &&
        fromIndex !== toIndex;

      if (!isValidMove) {
        return;
      }

      const [pokemon] = state.pokemons.splice(fromIndex, 1);

      state.pokemons.splice(toIndex, 0, pokemon);
    },
    clearTeam(state) {
      state.pokemons = [];
    },
  },
});

export const { addPokemon, removePokemon, reorderTeam, clearTeam } = teamSlice.actions;

export const selectTeam = (state) => state.team.pokemons;

export default teamSlice.reducer;
