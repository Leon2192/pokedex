import React from 'react';
import DataStatusBadge from '@/components/DataStatusBadge';
import ErrorState from '@/components/ErrorState';
import {
  CompareButton,
  ComparisonGrid,
  ComparisonPanel,
  EmptyState,
  EmptyStateText,
  EmptyStateTitle,
  Field,
  FieldError,
  Form,
  Header,
  Image,
  ImageFrame,
  Intro,
  Label,
  OptionButton,
  OptionContent,
  OptionImage,
  OptionImageFrame,
  OptionMeta,
  OptionName,
  OptionNumber,
  OptionsMenu,
  Page,
  PanelHeader,
  PanelTitle,
  SelectorClearButton,
  SelectorInput,
  SelectorInputWrap,
  SelectorMessage,
  SkeletonBlock,
  SkeletonGrid,
  StatBar,
  StatFill,
  StatPokemonLabel,
  StatName,
  StatRow,
  StatSide,
  StatValue,
  StatsPanel,
  Title,
  TypeBadge,
  Types,
} from './Compare.styled';

const renderPokemonPanel = (pokemon, label) => (
  <ComparisonPanel>
    <PanelHeader>
      <span>{label}</span>
      <strong>{pokemon.number}</strong>
    </PanelHeader>
    <ImageFrame>
      <Image src={pokemon.sprite} alt={`Ilustracion de ${pokemon.displayName}`} />
    </ImageFrame>
    <PanelTitle>{pokemon.displayName}</PanelTitle>
    <Types aria-label={`Tipos de ${pokemon.displayName}`}>
      {pokemon.types.map((type) => (
        <TypeBadge key={type.name} $color={type.color}>
          {type.displayName}
        </TypeBadge>
      ))}
    </Types>
  </ComparisonPanel>
);

const renderSkeleton = () => (
  <SkeletonGrid>
    <SkeletonBlock />
    <SkeletonBlock />
  </SkeletonGrid>
);

const renderSelectorOption = (selector, pokemon, onSelectorSelect) => (
  <OptionButton
    key={pokemon.id}
    type="button"
    role="option"
    aria-selected={selector.selectedValue === pokemon.name}
    $isSelected={selector.selectedValue === pokemon.name}
    onMouseDown={(event) => event.preventDefault()}
    onClick={() => onSelectorSelect(selector.fieldName, pokemon)}
  >
    <OptionImageFrame>
      {pokemon.sprite ? (
        <OptionImage src={pokemon.sprite} alt="" loading="lazy" width="32" height="32" />
      ) : null}
    </OptionImageFrame>
    <OptionContent>
      <OptionName>{pokemon.displayName}</OptionName>
      <OptionMeta>{pokemon.name}</OptionMeta>
    </OptionContent>
    <OptionNumber>{pokemon.number}</OptionNumber>
  </OptionButton>
);

const renderPokemonSelector = ({
  isOptionsLoading,
  isSelectorDisabled,
  onSelectorBlur,
  onSelectorClear,
  onSelectorFocus,
  onSelectorSearch,
  onSelectorSelect,
  selector,
}) => {
  const listboxId = `${selector.fieldName}-options`;
  const hasValue = Boolean(selector.searchValue || selector.selectedValue);

  return (
    <Field $isOpen={selector.isOpen}>
      <Label htmlFor={selector.fieldName}>{selector.label}</Label>
      <SelectorInputWrap>
        <SelectorInput
          id={selector.fieldName}
          name={selector.fieldName}
          autoComplete="off"
          disabled={isSelectorDisabled}
          $hasError={Boolean(selector.error)}
          onBlur={() => onSelectorBlur(selector.fieldName)}
          onChange={(event) => onSelectorSearch(selector.fieldName, event.target.value)}
          onClick={() => onSelectorFocus(selector.fieldName)}
          onFocus={() => onSelectorFocus(selector.fieldName)}
          placeholder={selector.placeholder}
          role="combobox"
          aria-autocomplete="list"
          aria-controls={listboxId}
          aria-expanded={selector.isOpen}
          value={selector.searchValue}
        />
        {hasValue ? (
          <SelectorClearButton
            type="button"
            disabled={isSelectorDisabled}
            aria-label={`Limpiar ${selector.label}`}
            onMouseDown={(event) => event.preventDefault()}
            onClick={() => onSelectorClear(selector.fieldName)}
          >
            x
          </SelectorClearButton>
        ) : null}
      </SelectorInputWrap>

      {selector.isOpen ? (
        <OptionsMenu id={listboxId} role="listbox">
          {isOptionsLoading ? <SelectorMessage>Cargando opciones...</SelectorMessage> : null}
          {!isOptionsLoading && selector.options.length === 0 ? (
            <SelectorMessage>No se encontraron Pokemon.</SelectorMessage>
          ) : null}
          {!isOptionsLoading
            ? selector.options.map((pokemon) =>
                renderSelectorOption(selector, pokemon, onSelectorSelect)
              )
            : null}
        </OptionsMenu>
      ) : null}

      {selector.error ? <FieldError>{selector.error}</FieldError> : null}
    </Field>
  );
};

const Compare = ({
  comparisonError,
  comparisonRows,
  displayStatus,
  handleSubmit,
  isComparisonBlockingError,
  isComparisonLoading,
  isOptionsBlockingError,
  isOptionsLoading,
  isSelectorDisabled,
  isSubmitting,
  onSelectorBlur,
  onSelectorClear,
  onSelectorFocus,
  onSelectorSearch,
  onSelectorSelect,
  onRetryComparison,
  onRetryOptions,
  optionsError,
  pokemonASelector,
  pokemonA,
  pokemonBSelector,
  pokemonB,
  showComparisonResult,
  showEmptyComparison,
}) => (
  <Page>
    <Header>
      <div>
        <Title>Comparar</Title>
        <Intro>Elegi dos Pokemon y compara sus stats base lado a lado.</Intro>
      </div>
      <DataStatusBadge status={displayStatus} />
    </Header>

    {isOptionsBlockingError ? <ErrorState error={optionsError} onRetry={onRetryOptions} /> : null}

    <Form onSubmit={handleSubmit} aria-busy={isOptionsLoading}>
      {renderPokemonSelector({
        isOptionsLoading,
        isSelectorDisabled,
        onSelectorBlur,
        onSelectorClear,
        onSelectorFocus,
        onSelectorSearch,
        onSelectorSelect,
        selector: pokemonASelector,
      })}

      {renderPokemonSelector({
        isOptionsLoading,
        isSelectorDisabled,
        onSelectorBlur,
        onSelectorClear,
        onSelectorFocus,
        onSelectorSearch,
        onSelectorSelect,
        selector: pokemonBSelector,
      })}

      <CompareButton type="submit" disabled={isSelectorDisabled || isSubmitting}>
        Comparar
      </CompareButton>
    </Form>

    {showEmptyComparison ? (
      <EmptyState>
        <EmptyStateTitle>Todavia no hay comparacion</EmptyStateTitle>
        <EmptyStateText>
          Elegi dos Pokemon diferentes para comparar tipos e indicadores base.
        </EmptyStateText>
      </EmptyState>
    ) : null}

    {isComparisonLoading ? renderSkeleton() : null}

    {isComparisonBlockingError ? (
      <ErrorState error={comparisonError} onRetry={onRetryComparison} />
    ) : null}

    {showComparisonResult ? (
      <>
        <ComparisonGrid>
          {renderPokemonPanel(pokemonA, 'Primer Pokemon')}
          {renderPokemonPanel(pokemonB, 'Segundo Pokemon')}
        </ComparisonGrid>

        <StatsPanel>
          {comparisonRows.map((row) => (
            <StatRow key={row.name}>
              <StatSide $side="left">
                <StatPokemonLabel>{pokemonA.displayName}</StatPokemonLabel>
                <StatValue $isWinner={row.winner === 'pokemonA'}>{row.pokemonA.value}</StatValue>
                <StatBar>
                  <StatFill $percentage={row.pokemonA.percentage} />
                </StatBar>
              </StatSide>

              <StatName>{row.displayName}</StatName>

              <StatSide $side="right">
                <StatPokemonLabel>{pokemonB.displayName}</StatPokemonLabel>
                <StatValue $isWinner={row.winner === 'pokemonB'}>{row.pokemonB.value}</StatValue>
                <StatBar>
                  <StatFill $percentage={row.pokemonB.percentage} />
                </StatBar>
              </StatSide>
            </StatRow>
          ))}
        </StatsPanel>
      </>
    ) : null}
  </Page>
);

export default React.memo(Compare);
