import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import { Theme } from '../styles/style-constants';

const StyledMessage = styled.div<{ localUser: boolean }>`
  display: flex;
  justify-content: ${({ localUser }) =>
    localUser ? 'flex-end' : 'flex-start'};
  padding-bottom: 1em;
`;

const MessageBody = styled.div<{ localUser: boolean }>`
  background-color: ${({ localUser }) =>
    localUser ? Theme.color.localUser : Theme.color.remoteUser};
  color: ${({ localUser }) => (localUser ? '#fff' : '#222')};
  padding: 1em;
  border-radius: 1em;
  max-width: 60%;
  pointer-events: none;
`;

const UserLabel = styled.div`
  display: grid;
  font-size: 1.2rem;
  place-items: center;
  height: 50px;
  width: 50px;
  margin-right: 0.5em;
  border-radius: 50%;
  border: 2px solid ${Theme.color.remoteUser};
  line-height: 1;
  cursor: default;
`;

const Message: FunctionComponent<{
  id: number;
  name: string;
  content: string;
  localUser: boolean;
}> = ({ id, name, content, localUser }) => {
  return (
    <StyledMessage localUser={localUser}>
      {!localUser && (
        <UserLabel title={name}>{name.slice(0, 2).toUpperCase()}</UserLabel>
      )}
      <MessageBody localUser={localUser}>{content}</MessageBody>
    </StyledMessage>
  );
};

export default Message;
