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
  OfflineState,
  Page,
  SkeletonGrid,
  Stats,
  Title,
} from './Pokedex.styled';

const renderSkeletons = (count) =>
  Array.from({ length: count }, (_, index) => <PokemonCardSkeleton key={index} />);

const Pokedex = ({
  dataStatus,
  error,
  fetchingSkeletonCount,
  filters,
  generationOptions,
  initialSkeletonCount,
  isGenerationsLoading,
  isOnline,
  isTypesLoading,
  lastPokemonRef,
  onClearFilters,
  onFiltersChange,
  onRetry,
  pokemons,
  showBlockingError,
  showEmptyResults,
  showEndState,
  showFetchingMoreSkeletons,
  showInitialSkeletons,
  showOfflineCacheState,
  showOfflineEmptyState,
  showPokemonGrid,
  totalCount,
  totalLoaded,
  typeOptions,
}) => (
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

    {showOfflineCacheState ? (
      <OfflineState>Estas sin conexion. Se muestran los datos disponibles en cache.</OfflineState>
    ) : null}

    {showOfflineEmptyState ? (
      <EmptyState>
        <EmptyStateBody>
          <h2>No hay conexion</h2>
          <p>No hay datos guardados para mostrar. Volve a intentarlo cuando estes online.</p>
        </EmptyStateBody>
        <EmptyStateAction type="button" disabled={!isOnline} onClick={onRetry}>
          Reintentar
        </EmptyStateAction>
      </EmptyState>
    ) : null}

    {showInitialSkeletons ? (
      <SkeletonGrid>{renderSkeletons(initialSkeletonCount)}</SkeletonGrid>
    ) : null}

    {showPokemonGrid ? (
      <PokemonGrid lastPokemonRef={lastPokemonRef} pokemonCount={totalLoaded} pokemons={pokemons} />
    ) : null}

    {showEmptyResults ? (
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

    {showFetchingMoreSkeletons ? (
      <SkeletonGrid>{renderSkeletons(fetchingSkeletonCount)}</SkeletonGrid>
    ) : null}

    {showEndState ? <EndState>Fin de los resultados</EndState> : null}
  </Page>
);

export default React.memo(Pokedex);
