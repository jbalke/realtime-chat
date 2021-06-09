import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  useMutation,
} from '@apollo/client';
import { WebSocketLink } from '@apollo/client/link/ws';
import React, { FunctionComponent, SyntheticEvent, useState } from 'react';
import styled from 'styled-components';
import MessageEntry from './components/MessageEntry';
import Messages from './components/Messages';
import { PostMessage, PostMessageVariables } from './generated/PostMessage';
import { POST_MESSAGE } from './graphql/mutations/postMessage';
import { split, HttpLink } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { useStickyState } from './hooks/stickyState';

const httpLink = new HttpLink({
  uri: 'http://localhost:4001',
});

const wsLink = new WebSocketLink({
  uri: 'ws://localhost:4001/subscriptions',
  options: {
    reconnect: true,
  },
});

// The split function takes three parameters:
//
// * A function that's called for each operation to execute
// * The Link to use for an operation if the function returns a "truthy" value
// * The Link to use for an operation if the function returns a "falsy" value
const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink
);

const Container = styled.div`
  width: 95%;
  max-width: 800px;
  margin: 0 auto;
`;


const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});

const Chat: FunctionComponent = (props) => {
  const [name, setName] = useStickyState('John', 'chatName');
  
  return (
    <Container>
      <Messages user={name} />
      <MessageEntry
        setName={(evt) => {
          setName(evt.target.value);
        }}
        formValues={{  user: name }}
      />
    </Container>
  );
};

export default () => (
  <ApolloProvider client={client}>
    <Chat />
  </ApolloProvider>
);
