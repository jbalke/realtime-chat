import {
  ApolloClient,
  ApolloProvider,
  gql,
  InMemoryCache,
  useQuery,
} from '@apollo/client';
import React, { FunctionComponent } from 'react';
import { GetMessages } from './generated/GetMessages';
import { GET_MESSAGES } from './graphql/queries/getMessages';
import styled from 'styled-components';
import { Theme } from './styles/style-constants';

const Container = styled.div`
  width: 80%;
  max-width: 800px;
  margin: 0 auto;
`;

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
`;

const Message: FunctionComponent<{
  id: number;
  name: string;
  content: string;
  localUser: boolean;
}> = ({ id, name, content, localUser }) => {
  return (
    <StyledMessage localUser={localUser}>
      {!localUser && <UserLabel>{name.slice(0, 2).toUpperCase()}</UserLabel>}
      <MessageBody localUser={localUser}>{content}</MessageBody>
    </StyledMessage>
  );
};

const client = new ApolloClient({
  uri: 'http://localhost:4001/',
  cache: new InMemoryCache(),
});

const Messages: FunctionComponent<{ user: string }> = ({ user }) => {
  const { loading, data, error } = useQuery<GetMessages>(GET_MESSAGES);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!data) {
    return null;
  }

  return (
    <>
      {data.messages.map(({ id, user: messageUser, content }) => (
        <Message
          key={id}
          id={id}
          name={messageUser}
          content={content}
          localUser={messageUser === user}
        />
      ))}{' '}
    </>
  );
};

const Chat: FunctionComponent = (props) => {
  return (
    <Container>
      <Messages user='John' />
    </Container>
  );
};

export default () => (
  <ApolloProvider client={client}>
    <Chat />
  </ApolloProvider>
);
