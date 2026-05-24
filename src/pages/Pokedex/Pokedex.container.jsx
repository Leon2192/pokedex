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

const INITIAL_SKELETON_COUNT = 12;
const FETCHING_MORE_SKELETON_COUNT = 4;

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
  const hasPokemons = pokemons.length > 0;
  const hasNextPage = Boolean(pokemonList?.next) && pokemons.length < (pokemonList?.count ?? 0);
  const isInitialLoading = (isLoading || isFetching) && !hasPokemons;
  const isSearchDebouncing = filters.search !== debouncedSearch;
  const isPaginationLocked = !isOnline || isError || isFetching || isSearchDebouncing;
  const canLoadMore = isOnline && !isError && hasNextPage;
  const isFetchingMore = isFetching && hasPokemons;
  const showOfflineEmptyState = !isOnline && !hasPokemons && !isInitialLoading;
  const showOfflineCacheState = !isOnline && hasPokemons;
  const showBlockingError = isOnline && isError && !hasPokemons;
  const showInitialSkeletons = !showBlockingError && isInitialLoading;
  const showPokemonGrid = !showBlockingError && !isInitialLoading && hasPokemons;
  const showEmptyResults =
    !showOfflineEmptyState && !showBlockingError && !isInitialLoading && !hasPokemons;
  const showFetchingMoreSkeletons = !showBlockingError && isOnline && isFetchingMore;
  const showEndState =
    !showBlockingError && isOnline && !isInitialLoading && !hasNextPage && hasPokemons;
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
    if (!canLoadMore || isPaginationLocked) {
      return;
    }

    setPagination((currentPagination) => ({
      offset:
        currentPagination.queryKey === queryKey
          ? currentPagination.offset + POKEMON_PAGE_SIZE
          : POKEMON_PAGE_SIZE,
      queryKey,
    }));
  }, [canLoadMore, isPaginationLocked, queryKey]);

  const lastPokemonRef = useInfiniteScroll({
    hasNextPage: canLoadMore,
    isFetching: isPaginationLocked,
    onLoadMore: handleLoadMore,
  });

  const handleRetry = useCallback(() => {
    if (!isOnline) {
      return;
    }

    refetch();
  }, [isOnline, refetch]);

  return (
    <Pokedex
      dataStatus={dataStatus}
      error={error}
      filters={filters}
      fetchingSkeletonCount={FETCHING_MORE_SKELETON_COUNT}
      generationOptions={generationOptions}
      initialSkeletonCount={INITIAL_SKELETON_COUNT}
      isGenerationsLoading={isGenerationsLoading}
      isOnline={isOnline}
      isTypesLoading={isTypesLoading}
      onClearFilters={handleClearFilters}
      onFiltersChange={handleFiltersChange}
      onRetry={handleRetry}
      pokemons={pokemons}
      lastPokemonRef={lastPokemonRef}
      showBlockingError={showBlockingError}
      showEmptyResults={showEmptyResults}
      showEndState={showEndState}
      showFetchingMoreSkeletons={showFetchingMoreSkeletons}
      showInitialSkeletons={showInitialSkeletons}
      showOfflineCacheState={showOfflineCacheState}
      showOfflineEmptyState={showOfflineEmptyState}
      showPokemonGrid={showPokemonGrid}
      totalCount={pokemonList?.count ?? 0}
      totalLoaded={pokemons.length}
      typeOptions={typeOptions}
    />
  );
};

export default PokedexContainer;
