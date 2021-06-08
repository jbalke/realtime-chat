import { useQuery } from '@apollo/client';
import React, { FunctionComponent } from 'react';
import { GetMessages } from '../generated/GetMessages';
import { GET_MESSAGES } from '../graphql/queries/getMessages';
import Message from './Message';

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

export default Messages;
