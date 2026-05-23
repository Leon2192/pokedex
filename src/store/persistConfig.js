import { createTransform } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { pokemonApi } from '@/services/api/pokemonApi';

const pokemonApiCacheTransform = createTransform(
  (inboundState) => {
    if (!inboundState) {
      return inboundState;
    }

    return {
      ...inboundState,
      mutations: {},
      subscriptions: {},
      config: {
        ...inboundState.config,
        focused: true,
        middlewareRegistered: false,
        online: true,
      },
    };
  },
  (outboundState) => outboundState,
  {
    whitelist: [pokemonApi.reducerPath],
  }
);

export const persistConfig = {
  key: 'pokedex-root',
  version: 1,
  storage,
  transforms: [pokemonApiCacheTransform],
  whitelist: ['team', pokemonApi.reducerPath],
};
