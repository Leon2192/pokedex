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
          <Intro>Explora Pokemon desde PokeAPI con busqueda, filtros y carga progresiva.</Intro>
        </div>
        <Stats>
          {totalLoaded} / {totalCount || '-'} cargados
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
        <PokemonGrid
          lastPokemonRef={lastPokemonRef}
          pokemonCount={totalLoaded}
          pokemons={pokemons}
        />
      ) : null}

      {!showBlockingError && !isInitialLoading && pokemons.length === 0 ? (
        <EmptyState>
          <EmptyStateBody>
            <h2>No se encontraron Pokemon</h2>
            <p>Proba con otra busqueda, tipo o generacion.</p>
          </EmptyStateBody>
          <EmptyStateAction type="button" onClick={onClearFilters}>
            Limpiar filtros
          </EmptyStateAction>
        </EmptyState>
      ) : null}

      {!showBlockingError && isFetchingMore ? (
        <SkeletonGrid>{renderSkeletons(4)}</SkeletonGrid>
      ) : null}

      {!showBlockingError && !isInitialLoading && !hasNextPage && pokemons.length > 0 ? (
        <EndState>Fin de los resultados</EndState>
      ) : null}
    </Page>
  );
};

export default React.memo(Pokedex);
