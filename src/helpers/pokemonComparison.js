import { POKEMON_SPRITE_BASE_URL } from '@/constants/api';
import { formatPokemonName, formatPokemonNumber } from '@/utils/formatters';

const STAT_MAX_VALUE = 255;

const normalizePokemonName = (value = '') => value.trim().toLowerCase();

const buildOptionSprite = (id) => (id ? `${POKEMON_SPRITE_BASE_URL}/${id}.png` : '');

export const normalizeCompareValues = (values) => ({
  pokemonA: normalizePokemonName(values.pokemonA),
  pokemonB: normalizePokemonName(values.pokemonB),
});

export const mapPokemonOptions = (options) =>
  options.map((option) => ({
    id: option.id,
    name: option.name,
    displayName: formatPokemonName(option.name),
    number: option.id ? formatPokemonNumber(option.id) : '#----',
    sprite: buildOptionSprite(option.id),
  }));

export const buildComparisonRows = (pokemonA, pokemonB) => {
  if (!pokemonA || !pokemonB) {
    return [];
  }

  const pokemonBStats = new Map(
    pokemonB.stats.map((stat) => [
      stat.name,
      {
        value: stat.value,
        percentage: Math.min(100, Math.round((stat.value / STAT_MAX_VALUE) * 100)),
      },
    ])
  );

  return pokemonA.stats.map((stat) => {
    const statB = pokemonBStats.get(stat.name) ?? { value: 0, percentage: 0 };

    return {
      name: stat.name,
      displayName: stat.displayName,
      pokemonA: {
        value: stat.value,
        percentage: Math.min(100, Math.round((stat.value / STAT_MAX_VALUE) * 100)),
      },
      pokemonB: statB,
      winner:
        stat.value === statB.value ? 'tie' : stat.value > statB.value ? 'pokemonA' : 'pokemonB',
    };
  });
};
