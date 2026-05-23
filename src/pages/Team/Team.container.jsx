import { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useToast } from '@/hooks/useToast';
import { MAX_TEAM_SIZE, removePokemon, selectTeam } from '@/store/slices/teamSlice';
import Team from './Team';

const TeamContainer = () => {
  const dispatch = useDispatch();
  const team = useSelector(selectTeam);
  const { showToast, toast } = useToast();
  const teamCount = team.length;

  const teamSlots = useMemo(
    () =>
      Array.from({ length: MAX_TEAM_SIZE }, (_, index) => ({
        id: team[index]?.id ?? `empty-${index}`,
        pokemon: team[index] ?? null,
        slotIndex: index,
      })),
    [team]
  );

  const handleRemovePokemon = useCallback(
    (pokemon) => {
      dispatch(removePokemon(pokemon.id));
      showToast(`${pokemon.displayName} removed from your team.`);
    },
    [dispatch, showToast]
  );

  return (
    <Team
      maxTeamSize={MAX_TEAM_SIZE}
      onRemovePokemon={handleRemovePokemon}
      teamCount={teamCount}
      teamSlots={teamSlots}
      toast={toast}
    />
  );
};

export default TeamContainer;
