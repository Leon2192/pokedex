import React from 'react';
import { ActionButton, Message, StateBox, Title } from './ErrorState.styled';

const ErrorState = ({ message, onRetry, title }) => (
  <StateBox role="alert">
    <Title>{title}</Title>
    <Message>{message}</Message>
    <ActionButton type="button" onClick={onRetry}>
      Retry
    </ActionButton>
  </StateBox>
);

export default React.memo(ErrorState);
