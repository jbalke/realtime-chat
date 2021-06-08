import {
  ApolloClient,
  ApolloProvider,
  gql,
  InMemoryCache,
  useMutation,
} from '@apollo/client';
import React, { FunctionComponent, SyntheticEvent, useState } from 'react';
import styled from 'styled-components';
import MessageEntry from './components/MessageEntry';
import Messages from './components/Messages';
import { PostMessage, PostMessageVariables } from './generated/PostMessage';
import { POST_MESSAGE } from './graphql/mutations/postMessage';
import { Theme } from './styles/style-constants';

const Container = styled.div`
  width: 95%;
  max-width: 800px;
  margin: 0 auto;
`;


const client = new ApolloClient({
  uri: 'http://localhost:4001/',
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
