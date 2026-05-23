export const ROUTES = {
  HOME: '/',
  POKEDEX: '/pokedex',
  POKEMON_DETAIL: '/pokemon/:name',
  TEAM: '/team',
  COMPARE: '/compare',
};

export const buildPokemonDetailPath = (name) => `/pokemon/${name}`;
