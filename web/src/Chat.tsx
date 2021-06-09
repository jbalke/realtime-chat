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
  const [state, setstate] = useState({
    user: 'John',
    content: '',
  });

  const [postMessage, { data, loading, error }] =
    useMutation<PostMessage, PostMessageVariables>(POST_MESSAGE);

  const handleSubmit = (evt: SyntheticEvent) => {
    evt.preventDefault();

    if (state.content.length > 0) {
      postMessage({ variables: state });
      setstate(old => ({...old, content:""}))
    }
  };

  return (
    <Container>
      <Messages user={state.user} />
      <MessageEntry
        handleSubmit={handleSubmit}
        setName={(evt) => {
          setstate((old) => ({ ...old, user: evt.target.value }));
        }}
        setContent={(evt) => {
          setstate((old) => ({ ...old, content: evt.target.value }));
        }}
        formValues={state}
      />
    </Container>
  );
};

export default () => (
  <ApolloProvider client={client}>
    <Chat />
  </ApolloProvider>
);
