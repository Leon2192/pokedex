import { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getQueryDataStatus } from '@/helpers/queryStatus';
import { useNetworkStatus } from '@/hooks/useNetworkStatus';
import { useToast } from '@/hooks/useToast';
import { ROUTES } from '@/routes';
import {
  useGetPokemonByNameOrIdQuery,
  useGetPokemonSpeciesByNameOrIdQuery,
} from '@/services/api/pokemonApi';
import { addPokemon, MAX_TEAM_SIZE, removePokemon, selectTeam } from '@/store/slices/teamSlice';
import { formatPokemonHeight, formatPokemonWeight } from '@/utils/formatters';
import PokemonDetail from './PokemonDetail';

const PokemonDetailContainer = () => {
  const { name } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isOnline = useNetworkStatus();
  const team = useSelector(selectTeam);
  const { showToast, toast } = useToast();
  const {
    currentData: pokemon,
    error,
    fulfilledTimeStamp,
    isError,
    isFetching,
    isLoading,
    refetch,
  } = useGetPokemonByNameOrIdQuery(name, {
    skip: !name,
  });
  const { currentData: species } = useGetPokemonSpeciesByNameOrIdQuery(pokemon?.speciesName, {
    skip: !pokemon?.speciesName,
  });

  const isPokemonInTeam = pokemon
    ? team.some((teamPokemon) => teamPokemon.id === pokemon.id || teamPokemon.name === pokemon.name)
    : false;
  const isTeamFull = team.length >= MAX_TEAM_SIZE;
  const teamButtonLabel = isPokemonInTeam
    ? 'Quitar del equipo'
    : isTeamFull
      ? 'Equipo completo'
      : 'Agregar al equipo';

  const detail = useMemo(() => {
    if (!pokemon) {
      return null;
    }

    return {
      ...pokemon,
      formattedHeight: formatPokemonHeight(pokemon.height),
      formattedWeight: formatPokemonWeight(pokemon.weight),
      variants: (species?.variants ?? pokemon.variants).map((variant) => ({
        ...variant,
        isCurrent: variant.name === pokemon.name,
      })),
    };
  }, [pokemon, species]);

  const dataStatus = useMemo(
    () =>
      getQueryDataStatus({
        fulfilledTimeStamp,
        hasData: Boolean(pokemon),
        isFetching,
        isOnline,
      }),
    [fulfilledTimeStamp, isFetching, isOnline, pokemon]
  );

  const handleBack = useCallback(() => {
    navigate(ROUTES.POKEDEX);
  }, [navigate]);

  const handleTeamToggle = useCallback(() => {
    if (!pokemon) {
      return;
    }

    if (isPokemonInTeam) {
      dispatch(removePokemon(pokemon.id));
      showToast(`${pokemon.displayName} se quito de tu equipo.`);
      return;
    }

    if (isTeamFull) {
      showToast(`Tu equipo ya tiene ${MAX_TEAM_SIZE} Pokemon.`, 'warning');
      return;
    }

    dispatch(
      addPokemon({
        id: pokemon.id,
        name: pokemon.name,
        displayName: pokemon.displayName,
        number: pokemon.number,
        sprite: pokemon.sprite,
        types: pokemon.types,
      })
    );
    showToast(`${pokemon.displayName} se agrego a tu equipo.`);
  }, [dispatch, isPokemonInTeam, isTeamFull, pokemon, showToast]);

  return (
    <PokemonDetail
      dataStatus={dataStatus}
      error={error}
      isError={isError}
      isFetching={isFetching}
      isLoading={isLoading}
      isPokemonInTeam={isPokemonInTeam}
      onBack={handleBack}
      onRetry={refetch}
      onTeamToggle={handleTeamToggle}
      pokemon={detail}
      teamButtonLabel={teamButtonLabel}
      toast={toast}
    />
  );
};

export default PokemonDetailContainer;
