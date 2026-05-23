import storage from 'redux-persist/lib/storage';

export const persistConfig = {
  key: 'pokedex-root',
  version: 2,
  storage,
  whitelist: ['team'],
};
