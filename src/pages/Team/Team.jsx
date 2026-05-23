import React from 'react';
import TeamPokemonCard from '@/components/TeamPokemonCard';
import Toast from '@/components/Toast';
import { ROUTES } from '@/routes';
import {
  BrowseLink,
  CountBadge,
  EmptyBody,
  EmptyCard,
  EmptyIllustration,
  EmptySlot,
  Header,
  Intro,
  Page,
  RosterGrid,
  SlotNumber,
  Title,
} from './Team.styled';

const Team = ({ maxTeamSize, onRemovePokemon, teamCount, teamSlots, toast }) => {
  const hasTeam = teamCount > 0;

  return (
    <Page>
      <Header>
        <div>
          <Title>Mi Equipo</Title>
          <Intro>Build a compact team of up to six Pokemon.</Intro>
        </div>
        <CountBadge>
          {teamCount}/{maxTeamSize} Pokemon en tu equipo
        </CountBadge>
      </Header>

      {!hasTeam ? (
        <EmptyCard>
          <EmptyIllustration aria-hidden="true" />
          <EmptyBody>
            <h2>Your team is empty</h2>
            <p>Add Pokemon from their detail page and they will stay here after refresh.</p>
            <BrowseLink to={ROUTES.POKEDEX}>Browse Pokedex</BrowseLink>
          </EmptyBody>
        </EmptyCard>
      ) : null}

      {hasTeam ? (
        <RosterGrid data-team-roster="ready">
          {teamSlots.map((slot) =>
            slot.pokemon ? (
              <TeamPokemonCard
                key={slot.id}
                onRemove={onRemovePokemon}
                pokemon={slot.pokemon}
                slotIndex={slot.slotIndex}
              />
            ) : (
              <EmptySlot key={slot.id} data-team-slot={slot.slotIndex}>
                <SlotNumber>Slot {slot.slotIndex + 1}</SlotNumber>
              </EmptySlot>
            )
          )}
        </RosterGrid>
      ) : null}

      <Toast toast={toast} />
    </Page>
  );
};

export default React.memo(Team);
