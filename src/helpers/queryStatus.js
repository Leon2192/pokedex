const FRESH_DATA_WINDOW_MS = 60 * 1000;

export const getQueryDataStatus = ({
  fulfilledTimeStamp,
  hasData,
  isFetching,
  isOnline = true,
}) => {
  if (!hasData) {
    return null;
  }

  if (!isOnline) {
    return {
      label: 'Cache sin conexion',
      tone: 'offline',
    };
  }

  if (isFetching) {
    return {
      label: 'Actualizando cache',
      tone: 'syncing',
    };
  }

  if (!fulfilledTimeStamp) {
    return {
      label: 'Datos cacheados',
      tone: 'cached',
    };
  }

  const age = Date.now() - fulfilledTimeStamp;

  if (age <= FRESH_DATA_WINDOW_MS) {
    return {
      label: 'Datos frescos',
      tone: 'fresh',
    };
  }

  return {
    label: 'Datos cacheados',
    tone: 'cached',
  };
};
