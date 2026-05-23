import { createApi } from '@reduxjs/toolkit/query/react';
import { API_ENDPOINTS, POKEMON_PAGE_SIZE } from '@/constants/api';
import { ALL_FILTER_VALUE } from '@/constants/filters';
import { hasActivePokedexFilters, normalizePokedexFilters } from '@/helpers/pokedexFilters';
import {
  mapNamedResource,
  mapNamedResourceList,
  mapPokemonDetails,
  mapPokemonSpecies,
} from '@/helpers/pokemonMappers';
import {
  filterNamedResourcesBySearch,
  intersectNamedResourceGroups,
  paginateNamedResources,
  sortNamedResourcesById,
} from '@/helpers/pokemonResourceFilters';
import { axiosBaseQuery } from './axiosBaseQuery';

const buildPokemonPath = (nameOrId) => `${API_ENDPOINTS.POKEMON}/${encodeURIComponent(nameOrId)}`;

const buildTypePath = (type) => `${API_ENDPOINTS.TYPES}/${encodeURIComponent(type)}`;

const buildGenerationPath = (generation) =>
  `${API_ENDPOINTS.GENERATIONS}/${encodeURIComponent(generation)}`;

const buildPokemonSpeciesPath = (nameOrId) =>
  `${API_ENDPOINTS.POKEMON_SPECIES}/${encodeURIComponent(nameOrId)}`;

const buildListCacheKey = (queryArgs = {}) => {
  const filters = normalizePokedexFilters(queryArgs);
  const limit = queryArgs.limit ?? POKEMON_PAGE_SIZE;

  return [
    'getPokemonList',
    limit,
    filters.search.toLowerCase(),
    filters.type,
    filters.generation,
  ].join('|');
};

const getAllPokemonResources = async (baseQuery) => {
  const countResult = await baseQuery({
    url: API_ENDPOINTS.POKEMON,
    params: { limit: 1, offset: 0 },
  });

  if (countResult.error) {
    return countResult;
  }

  const listResult = await baseQuery({
    url: API_ENDPOINTS.POKEMON,
    params: { limit: countResult.data.count, offset: 0 },
  });

  if (listResult.error) {
    return listResult;
  }

  return {
    data: mapNamedResourceList(listResult.data).results,
  };
};

const getPokemonResourcesByType = async (type, baseQuery) => {
  const result = await baseQuery({ url: buildTypePath(type) });

  if (result.error) {
    return result;
  }

  return {
    data: result.data.pokemon.map(({ pokemon }) => mapNamedResource(pokemon)),
  };
};

const getPokemonResourcesByGeneration = async (generation, baseQuery) => {
  const result = await baseQuery({ url: buildGenerationPath(generation) });

  if (result.error) {
    return result;
  }

  return {
    data: result.data.pokemon_species.map(mapNamedResource),
  };
};

const getFilteredPokemonResources = async (filters, baseQuery) => {
  const resourceGroups = [];

  if (filters.type !== ALL_FILTER_VALUE) {
    const typeResult = await getPokemonResourcesByType(filters.type, baseQuery);

    if (typeResult.error) {
      return typeResult;
    }

    resourceGroups.push(typeResult.data);
  }

  if (filters.generation !== ALL_FILTER_VALUE) {
    const generationResult = await getPokemonResourcesByGeneration(filters.generation, baseQuery);

    if (generationResult.error) {
      return generationResult;
    }

    resourceGroups.push(generationResult.data);
  }

  if (resourceGroups.length === 0) {
    return getAllPokemonResources(baseQuery);
  }

  return {
    data: intersectNamedResourceGroups(resourceGroups),
  };
};

const getPokemonDetailsFromResource = async (resource, baseQuery) => {
  const pokemonResult = await baseQuery({ url: buildPokemonPath(resource.name) });

  if (!pokemonResult.error) {
    return pokemonResult;
  }

  const speciesResult = await baseQuery({ url: buildPokemonSpeciesPath(resource.name) });

  if (speciesResult.error) {
    return pokemonResult;
  }

  const defaultVariety =
    speciesResult.data.varieties.find((variety) => variety.is_default) ??
    speciesResult.data.varieties[0];

  if (!defaultVariety?.pokemon?.name) {
    return pokemonResult;
  }

  return baseQuery({ url: buildPokemonPath(defaultVariety.pokemon.name) });
};

const getPokemonDetailsPage = async (resources, baseQuery) => {
  const details = await Promise.all(
    resources.map((resource) => getPokemonDetailsFromResource(resource, baseQuery))
  );
  const failedDetail = details.find((detail) => detail.error);

  if (failedDetail) {
    return { error: failedDetail.error };
  }

  return {
    data: details.map((detail) => mapPokemonDetails(detail.data)),
  };
};

export const pokemonApi = createApi({
  reducerPath: 'pokemonApi',
  baseQuery: axiosBaseQuery(),
  refetchOnReconnect: true,
  tagTypes: [
    'Pokemon',
    'PokemonSpecies',
    'PokemonList',
    'PokemonOptions',
    'PokemonTypes',
    'PokemonGenerations',
  ],
  keepUnusedDataFor: 300,
  endpoints: (builder) => ({
    getPokemonList: builder.query({
      async queryFn(args = {}, _queryApi, _extraOptions, baseQuery) {
        const limit = args.limit ?? POKEMON_PAGE_SIZE;
        const offset = args.offset ?? 0;
        const filters = normalizePokedexFilters(args);

        if (!hasActivePokedexFilters(filters)) {
          const listResult = await baseQuery({
            url: API_ENDPOINTS.POKEMON,
            params: { limit, offset },
          });

          if (listResult.error) {
            return { error: listResult.error };
          }

          const list = mapNamedResourceList(listResult.data);
          const detailsResult = await getPokemonDetailsPage(list.results, baseQuery);

          if (detailsResult.error) {
            return { error: detailsResult.error };
          }

          return {
            data: {
              ...list,
              offset,
              results: detailsResult.data,
            },
          };
        }

        const resourcesResult = await getFilteredPokemonResources(filters, baseQuery);

        if (resourcesResult.error) {
          return { error: resourcesResult.error };
        }

        const matchingResources = sortNamedResourcesById(
          filterNamedResourcesBySearch(resourcesResult.data, filters.search)
        );
        const pageResources = paginateNamedResources(matchingResources, {
          limit,
          offset,
        });
        const detailsResult = await getPokemonDetailsPage(pageResources, baseQuery);

        if (detailsResult.error) {
          return { error: detailsResult.error };
        }

        const nextOffset = offset + limit;

        return {
          data: {
            count: matchingResources.length,
            next: nextOffset < matchingResources.length ? String(nextOffset) : null,
            previous: offset > 0 ? String(Math.max(offset - limit, 0)) : null,
            offset,
            results: detailsResult.data,
          },
        };
      },
      serializeQueryArgs: ({ queryArgs }) => buildListCacheKey(queryArgs),
      merge(currentCache, incomingCache) {
        if (incomingCache.offset === 0) {
          Object.assign(currentCache, incomingCache);
          return;
        }

        const existingIds = new Set(currentCache.results.map((pokemon) => pokemon.id));

        incomingCache.results.forEach((pokemon) => {
          if (!existingIds.has(pokemon.id)) {
            currentCache.results.push(pokemon);
          }
        });

        currentCache.count = incomingCache.count;
        currentCache.next = incomingCache.next;
        currentCache.previous = incomingCache.previous;
      },
      forceRefetch({ currentArg, previousArg }) {
        return (
          currentArg?.offset !== previousArg?.offset ||
          buildListCacheKey(currentArg) !== buildListCacheKey(previousArg)
        );
      },
      providesTags: (result) =>
        result
          ? [
              ...result.results.map((pokemon) => ({ type: 'Pokemon', id: pokemon.id })),
              { type: 'PokemonList', id: 'PARTIAL-LIST' },
            ]
          : [{ type: 'PokemonList', id: 'PARTIAL-LIST' }],
    }),
    getPokemonByNameOrId: builder.query({
      query: (nameOrId) => ({
        url: buildPokemonPath(nameOrId),
      }),
      transformResponse: mapPokemonDetails,
      providesTags: (_result, _error, nameOrId) => [
        { type: 'Pokemon', id: String(nameOrId).toLowerCase() },
      ],
    }),
    getPokemonSpeciesByNameOrId: builder.query({
      query: (nameOrId) => ({
        url: buildPokemonSpeciesPath(nameOrId),
      }),
      transformResponse: mapPokemonSpecies,
      providesTags: (_result, _error, nameOrId) => [
        { type: 'PokemonSpecies', id: String(nameOrId).toLowerCase() },
      ],
    }),
    getPokemonOptions: builder.query({
      async queryFn(_args, _queryApi, _extraOptions, baseQuery) {
        const resourcesResult = await getAllPokemonResources(baseQuery);

        if (resourcesResult.error) {
          return { error: resourcesResult.error };
        }

        return {
          data: sortNamedResourcesById(resourcesResult.data),
        };
      },
      providesTags: [{ type: 'PokemonOptions', id: 'LIST' }],
    }),
    getPokemonTypes: builder.query({
      query: () => ({
        url: API_ENDPOINTS.TYPES,
      }),
      transformResponse: (response) => response.results.map(mapNamedResource),
      providesTags: [{ type: 'PokemonTypes', id: 'LIST' }],
    }),
    getPokemonGenerations: builder.query({
      query: () => ({
        url: API_ENDPOINTS.GENERATIONS,
      }),
      transformResponse: (response) => response.results.map(mapNamedResource),
      providesTags: [{ type: 'PokemonGenerations', id: 'LIST' }],
    }),
  }),
});

export const {
  useGetPokemonListQuery,
  useGetPokemonByNameOrIdQuery,
  useGetPokemonSpeciesByNameOrIdQuery,
  useGetPokemonOptionsQuery,
  useGetPokemonTypesQuery,
  useGetPokemonGenerationsQuery,
} = pokemonApi;
