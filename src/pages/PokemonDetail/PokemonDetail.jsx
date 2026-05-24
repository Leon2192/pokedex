import React from 'react';
import DataStatusBadge from '@/components/DataStatusBadge';
import ErrorState from '@/components/ErrorState';
import PokemonStatsChart from '@/components/PokemonStatsChart';
import Toast from '@/components/Toast';
import {
  AbilityBadge,
  AbilityList,
  ActionButton,
  Actions,
  BackButton,
  DetailGrid,
  HeroImage,
  HeroPanel,
  InfoGrid,
  InfoItem,
  InfoLabel,
  InfoValue,
  MainPanel,
  Page,
  Panel,
  PanelTitle,
  SkeletonBlock,
  SkeletonGrid,
  SpriteCard,
  SpriteImage,
  SpriteLabel,
  SpritesGrid,
  Subtitle,
  Title,
  TypeBadge,
  Types,
  VariantBadge,
  VariantsGrid,
} from './PokemonDetail.styled';

const renderSkeleton = () => (
  <Page>
    <Actions>
      <BackButton type="button" disabled>
        Volver a la Pokedex
      </BackButton>
    </Actions>
    <SkeletonGrid>
      <SkeletonBlock $height="420px" />
      <SkeletonBlock $height="420px" />
    </SkeletonGrid>
  </Page>
);

const PokemonDetail = ({
  dataStatus,
  error,
  isError,
  isFetching,
  isLoading,
  isPokemonInTeam,
  onBack,
  onRetry,
  onTeamToggle,
  pokemon,
  teamButtonLabel,
  toast,
}) => {
  if (isLoading || (!pokemon && isFetching)) {
    return renderSkeleton();
  }

  const showBlockingError = isError && !pokemon;

  return (
    <Page>
      <Actions>
        <BackButton type="button" onClick={onBack}>
          Volver a la Pokedex
        </BackButton>

        {pokemon ? <DataStatusBadge status={dataStatus} /> : null}

        {pokemon ? (
          <ActionButton
            type="button"
            $isActive={isPokemonInTeam}
            data-testid="add-to-team-button"
            onClick={onTeamToggle}
          >
            {teamButtonLabel}
          </ActionButton>
        ) : null}
      </Actions>

      {showBlockingError ? <ErrorState error={error} onRetry={onRetry} /> : null}

      {!showBlockingError && pokemon ? (
        <DetailGrid>
          <HeroPanel>
            <Subtitle>{pokemon.number}</Subtitle>
            <Title data-testid="pokemon-detail-title">{pokemon.displayName}</Title>

            <Types aria-label={`Tipos de ${pokemon.displayName}`}>
              {pokemon.types.map((type) => (
                <TypeBadge key={type.name} $color={type.color}>
                  {type.displayName}
                </TypeBadge>
              ))}
            </Types>

            <HeroImage src={pokemon.sprite} alt={`Ilustracion de ${pokemon.displayName}`} />
          </HeroPanel>

          <MainPanel>
            <InfoGrid>
              <InfoItem>
                <InfoLabel>Altura</InfoLabel>
                <InfoValue>{pokemon.formattedHeight}</InfoValue>
              </InfoItem>
              <InfoItem>
                <InfoLabel>Peso</InfoLabel>
                <InfoValue>{pokemon.formattedWeight}</InfoValue>
              </InfoItem>
            </InfoGrid>

            <Panel>
              <PanelTitle>Habilidades</PanelTitle>
              <AbilityList>
                {pokemon.abilities.map((ability) => (
                  <AbilityBadge key={ability.name}>
                    {ability.displayName}
                    {ability.isHidden ? ' oculta' : ''}
                  </AbilityBadge>
                ))}
              </AbilityList>
            </Panel>

            <Panel>
              <PanelTitle>Estadisticas</PanelTitle>
              <PokemonStatsChart stats={pokemon.stats} />
            </Panel>
          </MainPanel>

          {pokemon.variants.length > 1 ? (
            <Panel>
              <PanelTitle>Variantes</PanelTitle>
              <VariantsGrid>
                {pokemon.variants.map((variant) => (
                  <VariantBadge
                    key={variant.name}
                    to={`/pokemon/${variant.name}`}
                    $isCurrent={variant.isCurrent}
                  >
                    {variant.displayName}
                    {variant.isDefault ? ' / principal' : ''}
                  </VariantBadge>
                ))}
              </VariantsGrid>
            </Panel>
          ) : null}

          <Panel>
            <PanelTitle>Sprites</PanelTitle>
            <SpritesGrid>
              {pokemon.sprites.map((sprite) => (
                <SpriteCard key={sprite.key}>
                  <SpriteImage src={sprite.src} alt={`${pokemon.displayName} ${sprite.label}`} />
                  <SpriteLabel>{sprite.label}</SpriteLabel>
                </SpriteCard>
              ))}
            </SpritesGrid>
          </Panel>
        </DetailGrid>
      ) : null}

      <Toast toast={toast} />
    </Page>
  );
};

export default React.memo(PokemonDetail);
