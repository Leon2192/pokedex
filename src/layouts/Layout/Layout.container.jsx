import { useEffect, useMemo, useRef } from 'react';
import { useToast } from '@/hooks/useToast';
import { useLocation, useOutlet } from 'react-router-dom';
import { useNetworkStatus } from '@/hooks/useNetworkStatus';
import { ROUTES } from '@/routes';
import Layout from './Layout';

const NETWORK_TOAST_DURATION = 2600;

const LayoutContainer = () => {
  const location = useLocation();
  const outlet = useOutlet();
  const isOnline = useNetworkStatus();
  const { showToast, toast: networkToast } = useToast();
  const previousOnlineRef = useRef(isOnline);

  const navItems = useMemo(
    () => [
      { label: 'Pokedex', to: ROUTES.POKEDEX },
      { label: 'Team', to: ROUTES.TEAM },
      { label: 'Compare', to: ROUTES.COMPARE },
    ],
    []
  );

  useEffect(() => {
    if (previousOnlineRef.current === isOnline) {
      return undefined;
    }

    previousOnlineRef.current = isOnline;
    showToast(
      isOnline
        ? 'Back online. Fresh data can be loaded again.'
        : 'You are offline. Cached Pokemon data remains available.',
      isOnline ? 'online' : 'offline',
      NETWORK_TOAST_DURATION
    );

    return undefined;
  }, [isOnline, showToast]);

  return (
    <Layout
      brandPath={ROUTES.POKEDEX}
      isOnline={isOnline}
      navItems={navItems}
      networkToast={networkToast}
      pathname={location.pathname}
    >
      {outlet}
    </Layout>
  );
};

export default LayoutContainer;
