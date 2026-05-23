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
          <Intro>Arma un equipo de hasta seis Pokemon.</Intro>
        </div>
        <CountBadge>
          {teamCount}/{maxTeamSize} Pokemon en tu equipo
        </CountBadge>
      </Header>

      {!hasTeam ? (
        <EmptyCard>
          <EmptyIllustration aria-hidden="true" />
          <EmptyBody>
            <h2>Tu equipo esta vacio</h2>
            <p>Agrega Pokemon desde su detalle y se mantendran aca despues de refrescar.</p>
            <BrowseLink to={ROUTES.POKEDEX}>Explorar Pokedex</BrowseLink>
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
                <SlotNumber>Espacio {slot.slotIndex + 1}</SlotNumber>
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
