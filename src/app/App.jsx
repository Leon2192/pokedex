import { Suspense } from 'react';
import { AppRoutes } from '@/routes';
import RouteFallback from '@/components/RouteFallback';

const App = () => (
  <Suspense fallback={<RouteFallback />}>
    <AppRoutes />
  </Suspense>
);

export default App;
