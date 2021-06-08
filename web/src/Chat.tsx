import {
  ApolloClient,
  ApolloProvider,
  gql,
  InMemoryCache,
  useMutation,
} from '@apollo/client';
import React, { FunctionComponent, SyntheticEvent, useState } from 'react';
import styled from 'styled-components';
import Messages from './components/Messages';
import { PostMessage, PostMessageVariables } from './generated/PostMessage';
import { POST_MESSAGE } from './graphql/mutations/postMessage';
import { Theme } from './styles/style-constants';

const Container = styled.div`
  width: 95%;
  max-width: 800px;
  margin: 0 auto;
`;

const StyledForm = styled.form`
  display: grid;
  grid-template-columns: 100px 1fr auto;
  gap: 1em;
  font-size: 1.1rem;
  margin-top: 1em;

  input[type='text'] {
    padding: 1em;
    font-size: inherit;
  }

  input[type='text']:focus {
    border: 2px solid ${Theme.color.localUser};
    outline: 1px solid ${Theme.color.localUser};
  }

  input[type='submit'] {
    font-size: inherit;
    appearance: none;
    background-color: #154af9;
    color: #fff;
    border: none;
    border-radius: 9999px;
    padding: 1em 2em;
    text-transform: uppercase;
    cursor: pointer;
  }
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
      <StyledForm onSubmit={handleSubmit}>
        <input
          type='text'
          onChange={(evt) => {
            setstate((old) => ({ ...old, user: evt.target.value }));
          }}
          value={state.user}
          placeholder='Your name'
        />
        <input
          type='text'
          onChange={(evt) => {
            setstate((old) => ({ ...old, content: evt.target.value }));
          }}
          value={state.content}
          placeholder='Message'
        />
        <input type='submit' value='Submit' />
      </StyledForm>
    </Container>
  );
};

export default () => (
  <ApolloProvider client={client}>
    <Chat />
  </ApolloProvider>
);
