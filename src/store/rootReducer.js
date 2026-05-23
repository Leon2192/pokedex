import { combineReducers } from '@reduxjs/toolkit';
import { pokemonApi } from '@/services/api/pokemonApi';
import teamReducer from './slices/teamSlice';

export const rootReducer = combineReducers({
  team: teamReducer,
  [pokemonApi.reducerPath]: pokemonApi.reducer,
});
