import React from 'react';
import DataStatusBadge from '@/components/DataStatusBadge';
import ErrorState from '@/components/ErrorState';
import PokedexControls from '@/components/PokedexControls';
import PokemonCardSkeleton from '@/components/PokemonCardSkeleton';
import PokemonGrid from '@/components/PokemonGrid';
import {
  EmptyState,
  EmptyStateAction,
  EmptyStateBody,
  EndState,
  Header,
  HeaderMeta,
  Intro,
  Page,
  SkeletonGrid,
  Stats,
  Title,
} from './Pokedex.styled';

const SKELETON_COUNT = 12;

const renderSkeletons = (count) =>
  Array.from({ length: count }, (_, index) => <PokemonCardSkeleton key={index} />);

const Pokedex = ({
  dataStatus,
  error,
  filters,
  generationOptions,
  hasNextPage,
  isError,
  isFetchingMore,
  isGenerationsLoading,
  isInitialLoading,
  isTypesLoading,
  lastPokemonRef,
  onClearFilters,
  onFiltersChange,
  onRetry,
  pokemons,
  totalCount,
  totalLoaded,
  typeOptions,
}) => {
  const showBlockingError = isError && pokemons.length === 0;

  return (
    <Page>
      <Header>
        <div>
          <Title>Pokedex</Title>
          <Intro>Browse Pokemon from PokeAPI with a scalable React foundation.</Intro>
        </div>
        <Stats>
          {totalLoaded} / {totalCount || '-'} loaded
        </Stats>
        <HeaderMeta>
          <DataStatusBadge status={dataStatus} />
        </HeaderMeta>
      </Header>

      <PokedexControls
        generationOptions={generationOptions}
        initialValues={filters}
        isGenerationsLoading={isGenerationsLoading}
        isTypesLoading={isTypesLoading}
        onFiltersChange={onFiltersChange}
        typeOptions={typeOptions}
      />

      {showBlockingError ? <ErrorState error={error} onRetry={onRetry} /> : null}

      {!showBlockingError && isInitialLoading ? (
        <SkeletonGrid>{renderSkeletons(SKELETON_COUNT)}</SkeletonGrid>
      ) : null}

      {!showBlockingError && !isInitialLoading && pokemons.length > 0 ? (
        <PokemonGrid lastPokemonRef={lastPokemonRef} pokemons={pokemons} />
      ) : null}

      {!showBlockingError && !isInitialLoading && pokemons.length === 0 ? (
        <EmptyState>
          <EmptyStateBody>
            <h2>No Pokemon found</h2>
            <p>Try a different search, type, or generation filter.</p>
          </EmptyStateBody>
          <EmptyStateAction type="button" onClick={onClearFilters}>
            Clear filters
          </EmptyStateAction>
        </EmptyState>
      ) : null}

      {!showBlockingError && isFetchingMore ? (
        <SkeletonGrid>{renderSkeletons(4)}</SkeletonGrid>
      ) : null}

      {!showBlockingError && !isInitialLoading && !hasNextPage && pokemons.length > 0 ? (
        <EndState>End of results</EndState>
      ) : null}
    </Page>
  );
};

export default React.memo(Pokedex);
