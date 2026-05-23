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
      label: 'Cached offline',
      tone: 'offline',
    };
  }

  if (isFetching) {
    return {
      label: 'Updating cache',
      tone: 'syncing',
    };
  }

  if (!fulfilledTimeStamp) {
    return {
      label: 'Cached data',
      tone: 'cached',
    };
  }

  const age = Date.now() - fulfilledTimeStamp;

  if (age <= FRESH_DATA_WINDOW_MS) {
    return {
      label: 'Fresh data',
      tone: 'fresh',
    };
  }

  return {
    label: 'Cached data',
    tone: 'cached',
  };
};
