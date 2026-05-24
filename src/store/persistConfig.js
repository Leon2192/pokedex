import storage from 'redux-persist/lib/storage';
import { createTransform } from 'redux-persist';
import { pokemonApi } from '@/services/api/pokemonApi';

const keepFulfilledQueries = (queries = {}) =>
  Object.fromEntries(
    Object.entries(queries)
      .filter(([, query]) => query?.status === 'fulfilled' && query?.data)
      .map(([cacheKey, query]) => [
        cacheKey,
        {
          ...query,
          error: undefined,
          fulfilledTimeStamp: 1,
          startedTimeStamp: undefined,
        },
      ])
  );

const sanitizePokemonApiCache = (state) => ({
  ...state,
  queries: keepFulfilledQueries(state?.queries),
  mutations: {},
  subscriptions: {},
});

const pokemonApiPersistTransform = createTransform(
  (state) => sanitizePokemonApiCache(state),
  (state) => sanitizePokemonApiCache(state),
  { whitelist: [pokemonApi.reducerPath] }
);

export const persistConfig = {
  key: 'pokedex-root',
  version: 2,
  storage,
  whitelist: ['team', pokemonApi.reducerPath],
  transforms: [pokemonApiPersistTransform],
};
