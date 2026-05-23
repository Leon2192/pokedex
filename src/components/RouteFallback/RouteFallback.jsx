import React from 'react';
import { Loader, LoaderDot, LoaderText } from './RouteFallback.styled';

const RouteFallback = () => (
  <Loader role="status" aria-live="polite">
    <LoaderDot />
    <LoaderText>Loading</LoaderText>
  </Loader>
);

export default React.memo(RouteFallback);
