import { lazy } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Layout from '@/layouts/Layout';
import { ROUTES } from './paths';

const PokedexPage = lazy(() => import('@/pages/Pokedex'));
const PokemonDetailPage = lazy(() => import('@/pages/PokemonDetail'));
const TeamPage = lazy(() => import('@/pages/Team'));
const ComparePage = lazy(() => import('@/pages/Compare'));

export const AppRoutes = () => (
  <Routes>
    <Route path={ROUTES.HOME} element={<Layout />}>
      <Route index element={<Navigate to={ROUTES.POKEDEX} replace />} />
      <Route path="pokedex" element={<PokedexPage />} />
      <Route path="pokemon/:name" element={<PokemonDetailPage />} />
      <Route path="team" element={<TeamPage />} />
      <Route path="compare" element={<ComparePage />} />
      <Route path="*" element={<Navigate to={ROUTES.POKEDEX} replace />} />
    </Route>
  </Routes>
);
