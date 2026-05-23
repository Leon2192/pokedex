import { ALL_FILTER_VALUE, POKEDEX_FILTER_DEFAULTS } from '@/constants/filters';

const normalizeText = (value) => String(value ?? '').trim();

const normalizeType = (value) => {
  const type = normalizeText(value).toLowerCase();

  return type && type !== ALL_FILTER_VALUE ? type : ALL_FILTER_VALUE;
};

const normalizeGeneration = (value) => {
  const generation = normalizeText(value);

  return /^\d+$/.test(generation) ? generation : ALL_FILTER_VALUE;
};

export const normalizePokedexFilters = (filters = {}) => ({
  search: normalizeText(filters.search).slice(0, 40),
  type: normalizeType(filters.type),
  generation: normalizeGeneration(filters.generation),
});

export const normalizePokemonSearch = (search = '') => normalizeText(search).toLowerCase();

export const getPokedexFiltersFromSearchParams = (searchParams) =>
  normalizePokedexFilters({
    search: searchParams.get('search') ?? POKEDEX_FILTER_DEFAULTS.search,
    type: searchParams.get('type') ?? POKEDEX_FILTER_DEFAULTS.type,
    generation: searchParams.get('generation') ?? POKEDEX_FILTER_DEFAULTS.generation,
  });

export const createPokedexSearchParams = (filters) => {
  const normalizedFilters = normalizePokedexFilters(filters);
  const params = new URLSearchParams();

  if (normalizedFilters.search) {
    params.set('search', normalizedFilters.search);
  }

  if (normalizedFilters.type !== ALL_FILTER_VALUE) {
    params.set('type', normalizedFilters.type);
  }

  if (normalizedFilters.generation !== ALL_FILTER_VALUE) {
    params.set('generation', normalizedFilters.generation);
  }

  return params;
};

export const hasActivePokedexFilters = (filters) => {
  const normalizedFilters = normalizePokedexFilters(filters);

  return (
    Boolean(normalizedFilters.search) ||
    normalizedFilters.type !== ALL_FILTER_VALUE ||
    normalizedFilters.generation !== ALL_FILTER_VALUE
  );
};
