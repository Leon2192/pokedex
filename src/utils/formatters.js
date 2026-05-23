export const formatPokemonNumber = (id) => `#${String(id).padStart(4, '0')}`;

export const formatPokemonName = (name = '') =>
  name
    .split('-')
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');

export const formatPokemonHeight = (height = 0) => `${(height / 10).toFixed(1)} m`;

export const formatPokemonWeight = (weight = 0) => `${(weight / 10).toFixed(1)} kg`;
