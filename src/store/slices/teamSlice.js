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
    clearTeam(state) {
      state.pokemons = [];
    },
  },
});

export const { addPokemon, removePokemon, clearTeam } = teamSlice.actions;

export const selectTeam = (state) => state.team.pokemons;

export default teamSlice.reducer;
