import React from 'react';
import { Badge, Dot } from './DataStatusBadge.styled';

const DataStatusBadge = ({ status }) => (
  <Badge $tone={status.tone}>
    <Dot $tone={status.tone} aria-hidden="true" />
    {status.label}
  </Badge>
);

export default React.memo(DataStatusBadge);
