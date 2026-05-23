import { useMemo } from 'react';
import ErrorState from './ErrorState';

const ErrorStateContainer = ({ error, onRetry }) => {
  const { message, title } = useMemo(() => {
    const status = error?.status;
    const isNetworkError = status === 'NETWORK_ERROR' || status === 'FETCH_ERROR';

    if (isNetworkError) {
      return {
        title: 'Network unavailable',
        message:
          'We could not reach PokeAPI. Check your connection or keep using cached data if it is available.',
      };
    }

    if (status === 404) {
      return {
        title: 'Pokemon not found',
        message: 'That Pokemon could not be found. Try another name or ID.',
      };
    }

    return {
      title: 'Something went wrong',
      message:
        error?.message ??
        'The Pokemon data could not be loaded. Check the connection and try again.',
    };
  }, [error?.message, error?.status]);

  return <ErrorState message={message} onRetry={onRetry} title={title} />;
};

export default ErrorStateContainer;
