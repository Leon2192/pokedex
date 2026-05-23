import { useCallback, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { POKEMON_PAGE_SIZE } from '@/constants/api';
import { POKEDEX_FILTER_DEFAULTS } from '@/constants/filters';
import {
  createPokedexSearchParams,
  getPokedexFiltersFromSearchParams,
} from '@/helpers/pokedexFilters';
import { getQueryDataStatus } from '@/helpers/queryStatus';
import { useDebouncedValue } from '@/hooks/useDebouncedValue';
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';
import { useNetworkStatus } from '@/hooks/useNetworkStatus';
import {
  useGetPokemonGenerationsQuery,
  useGetPokemonListQuery,
  useGetPokemonTypesQuery,
} from '@/services/api/pokemonApi';
import Pokedex from './Pokedex';

const PokedexContainer = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const isOnline = useNetworkStatus();
  const filters = useMemo(() => getPokedexFiltersFromSearchParams(searchParams), [searchParams]);
  const debouncedSearch = useDebouncedValue(filters.search, 300);
  const queryFilters = useMemo(
    () => ({
      ...filters,
      search: debouncedSearch,
    }),
    [debouncedSearch, filters]
  );
  const queryKey = useMemo(
    () =>
      [queryFilters.search.trim().toLowerCase(), queryFilters.type, queryFilters.generation].join(
        '|'
      ),
    [queryFilters]
  );
  const [pagination, setPagination] = useState({
    offset: 0,
    queryKey: '',
  });
  const offset = pagination.queryKey === queryKey ? pagination.offset : 0;

  const {
    currentData: pokemonList,
    error,
    fulfilledTimeStamp,
    isError,
    isFetching,
    isLoading,
    refetch,
  } = useGetPokemonListQuery({
    limit: POKEMON_PAGE_SIZE,
    offset,
    ...queryFilters,
  });
  const { data: typeOptions = [], isFetching: isTypesLoading } = useGetPokemonTypesQuery();
  const { data: generationOptions = [], isFetching: isGenerationsLoading } =
    useGetPokemonGenerationsQuery();

  const pokemons = pokemonList?.results ?? [];
  const hasNextPage = Boolean(pokemonList?.next) && pokemons.length < (pokemonList?.count ?? 0);
  const isInitialLoading = (isLoading || isFetching) && pokemons.length === 0;
  const isSearchDebouncing = filters.search !== debouncedSearch;
  const isPaginationLocked = isFetching || isSearchDebouncing;
  const isFetchingMore = isFetching && pokemons.length > 0;
  const dataStatus = useMemo(
    () =>
      getQueryDataStatus({
        fulfilledTimeStamp,
        hasData: Boolean(pokemonList),
        isFetching,
        isOnline,
      }),
    [fulfilledTimeStamp, isFetching, isOnline, pokemonList]
  );

  const handleFiltersChange = useCallback(
    (nextFilters) => {
      setPagination({ offset: 0, queryKey: '' });
      setSearchParams(createPokedexSearchParams(nextFilters), { replace: true });
    },
    [setSearchParams]
  );
  const handleClearFilters = useCallback(() => {
    handleFiltersChange(POKEDEX_FILTER_DEFAULTS);
  }, [handleFiltersChange]);

  const handleLoadMore = useCallback(() => {
    if (!hasNextPage || isPaginationLocked) {
      return;
    }

    setPagination((currentPagination) => ({
      offset:
        currentPagination.queryKey === queryKey
          ? currentPagination.offset + POKEMON_PAGE_SIZE
          : POKEMON_PAGE_SIZE,
      queryKey,
    }));
  }, [hasNextPage, isPaginationLocked, queryKey]);

  const lastPokemonRef = useInfiniteScroll({
    hasNextPage,
    isFetching: isPaginationLocked,
    onLoadMore: handleLoadMore,
  });

  const handleRetry = useCallback(() => {
    refetch();
  }, [refetch]);

  return (
    <Pokedex
      dataStatus={dataStatus}
      error={error}
      filters={filters}
      generationOptions={generationOptions}
      hasNextPage={hasNextPage}
      isError={isError}
      isFetchingMore={isFetchingMore}
      isGenerationsLoading={isGenerationsLoading}
      isInitialLoading={isInitialLoading}
      isTypesLoading={isTypesLoading}
      onClearFilters={handleClearFilters}
      onFiltersChange={handleFiltersChange}
      onRetry={handleRetry}
      pokemons={pokemons}
      lastPokemonRef={lastPokemonRef}
      totalCount={pokemonList?.count ?? 0}
      totalLoaded={pokemons.length}
      typeOptions={typeOptions}
    />
  );
};

export default PokedexContainer;
