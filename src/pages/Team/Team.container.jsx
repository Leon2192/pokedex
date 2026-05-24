import { useCallback, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useToast } from '@/hooks/useToast';
import { MAX_TEAM_SIZE, removePokemon, reorderTeam, selectTeam } from '@/store/slices/teamSlice';
import Team from './Team';

const TeamContainer = () => {
  const dispatch = useDispatch();
  const team = useSelector(selectTeam);
  const { showToast, toast } = useToast();
  const [dragState, setDragState] = useState({
    fromIndex: null,
    overIndex: null,
  });
  const teamCount = team.length;
  const hasTeam = teamCount > 0;

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
      showToast(`${pokemon.displayName} se quito de tu equipo.`);
    },
    [dispatch, showToast]
  );
  const handleDragStart = useCallback((slotIndex) => {
    setDragState({
      fromIndex: slotIndex,
      overIndex: slotIndex,
    });
  }, []);
  const handleDragEnter = useCallback((slotIndex) => {
    setDragState((currentState) => {
      if (currentState.fromIndex === null) {
        return currentState;
      }

      return {
        ...currentState,
        overIndex: slotIndex,
      };
    });
  }, []);
  const handleDragEnd = useCallback(() => {
    setDragState({
      fromIndex: null,
      overIndex: null,
    });
  }, []);
  const handleDrop = useCallback(
    (slotIndex) => {
      if (dragState.fromIndex === null || dragState.fromIndex === slotIndex) {
        handleDragEnd();
        return;
      }

      dispatch(
        reorderTeam({
          fromIndex: dragState.fromIndex,
          toIndex: slotIndex,
        })
      );
      handleDragEnd();
    },
    [dispatch, dragState.fromIndex, handleDragEnd]
  );

  return (
    <Team
      draggingSlotIndex={dragState.fromIndex}
      dragOverSlotIndex={dragState.overIndex}
      maxTeamSize={MAX_TEAM_SIZE}
      hasTeam={hasTeam}
      onDragEnd={handleDragEnd}
      onDragEnter={handleDragEnter}
      onDragStart={handleDragStart}
      onDrop={handleDrop}
      onRemovePokemon={handleRemovePokemon}
      teamCount={teamCount}
      teamSlots={teamSlots}
      toast={toast}
    />
  );
};

export default TeamContainer;
