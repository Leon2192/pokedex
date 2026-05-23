import { useMemo } from 'react';
import ErrorState from './ErrorState';

const ErrorStateContainer = ({ error, onRetry }) => {
  const { message, title } = useMemo(() => {
    const status = error?.status;
    const isNetworkError = status === 'NETWORK_ERROR' || status === 'FETCH_ERROR';

    if (isNetworkError) {
      return {
        title: 'No hay conexion disponible',
        message:
          'No pudimos conectar con PokeAPI. Revisa tu conexion o usa los datos ya cargados si estan disponibles.',
      };
    }

    if (status === 404) {
      return {
        title: 'Pokemon no encontrado',
        message: 'No se encontro ese Pokemon. Proba con otro nombre o ID.',
      };
    }

    return {
      title: 'Algo salio mal',
      message:
        error?.message ??
        'No se pudieron cargar los datos. Revisa la conexion e intentalo nuevamente.',
    };
  }, [error?.message, error?.status]);

  return <ErrorState message={message} onRetry={onRetry} title={title} />;
};

export default ErrorStateContainer;
