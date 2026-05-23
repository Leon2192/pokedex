import {
  DEFAULT_TYPE_COLOR,
  POKEMON_TYPE_COLORS,
  POKEMON_TYPE_LABELS,
} from '@/constants/pokemonTypes';

export const getResourceIdFromUrl = (url = '') => {
  const matches = url.match(/\/(\d+)\/?$/);

  return matches?.[1] ? Number(matches[1]) : null;
};

export const getPokemonTypeColor = (typeName) =>
  POKEMON_TYPE_COLORS[typeName] ?? DEFAULT_TYPE_COLOR;

export const getPokemonTypeLabel = (typeName) => POKEMON_TYPE_LABELS[typeName] ?? typeName;
