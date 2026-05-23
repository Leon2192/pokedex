import DataStatusBadge from './DataStatusBadge';

const DataStatusBadgeContainer = ({ status }) => {
  if (!status) {
    return null;
  }

  return <DataStatusBadge status={status} />;
};

export default DataStatusBadgeContainer;
