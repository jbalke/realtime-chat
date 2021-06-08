import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import Messages from './components/Messages';

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
