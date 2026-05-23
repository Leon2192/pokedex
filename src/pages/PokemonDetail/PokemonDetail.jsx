import React from 'react';
import DataStatusBadge from '@/components/DataStatusBadge';
import ErrorState from '@/components/ErrorState';
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
  StatBar,
  StatFill,
  StatHeader,
  StatItem,
  StatName,
  StatsList,
  StatValue,
  Subtitle,
  Title,
  TypeBadge,
  Types,
} from './PokemonDetail.styled';

const renderSkeleton = () => (
  <Page>
    <Actions>
      <BackButton type="button" disabled>
        Back to Pokedex
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
          Back to Pokedex
        </BackButton>

        {pokemon ? <DataStatusBadge status={dataStatus} /> : null}

        {pokemon ? (
          <ActionButton type="button" $isActive={isPokemonInTeam} onClick={onTeamToggle}>
            {teamButtonLabel}
          </ActionButton>
        ) : null}
      </Actions>

      {showBlockingError ? <ErrorState error={error} onRetry={onRetry} /> : null}

      {!showBlockingError && pokemon ? (
        <DetailGrid>
          <HeroPanel>
            <Subtitle>{pokemon.number}</Subtitle>
            <Title>{pokemon.displayName}</Title>

            <Types aria-label={`${pokemon.displayName} types`}>
              {pokemon.types.map((type) => (
                <TypeBadge key={type.name} $color={type.color}>
                  {type.displayName}
                </TypeBadge>
              ))}
            </Types>

            <HeroImage src={pokemon.sprite} alt={`${pokemon.displayName} artwork`} />
          </HeroPanel>

          <MainPanel>
            <InfoGrid>
              <InfoItem>
                <InfoLabel>Height</InfoLabel>
                <InfoValue>{pokemon.formattedHeight}</InfoValue>
              </InfoItem>
              <InfoItem>
                <InfoLabel>Weight</InfoLabel>
                <InfoValue>{pokemon.formattedWeight}</InfoValue>
              </InfoItem>
            </InfoGrid>

            <Panel>
              <PanelTitle>Abilities</PanelTitle>
              <AbilityList>
                {pokemon.abilities.map((ability) => (
                  <AbilityBadge key={ability.name}>
                    {ability.displayName}
                    {ability.isHidden ? ' hidden' : ''}
                  </AbilityBadge>
                ))}
              </AbilityList>
            </Panel>

            <Panel>
              <PanelTitle>Stats</PanelTitle>
              <StatsList>
                {pokemon.stats.map((stat) => (
                  <StatItem key={stat.name}>
                    <StatHeader>
                      <StatName>{stat.displayName}</StatName>
                      <StatValue>{stat.value}</StatValue>
                    </StatHeader>
                    <StatBar aria-hidden="true">
                      <StatFill $percentage={stat.percentage} />
                    </StatBar>
                  </StatItem>
                ))}
              </StatsList>
            </Panel>
          </MainPanel>

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
