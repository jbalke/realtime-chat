import { useQuery } from '@apollo/client';
import React, { FunctionComponent, useEffect } from 'react';
import { GetMessages } from '../generated/GetMessages';
import { OnNewMessage } from '../generated/OnNewMessage';
import { GET_MESSAGES } from '../graphql/queries/getMessages';
import { MESSAGE_SUBSCRIPTION } from '../graphql/subscriptions/onNewMessage';
import Message from './Message';

const Messages: FunctionComponent<{ user: string }> = ({ user }) => {
  const { loading, data, error, subscribeToMore } =
    useQuery<GetMessages>(GET_MESSAGES);

  useEffect(() => {
    subscribeToMore<OnNewMessage>({
      document: MESSAGE_SUBSCRIPTION,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData) return prev;

        const newMessage = subscriptionData.data.messageSent;

        return {
          messages: [...prev.messages, newMessage],
        };
      },
    });
  }, []);

    if (loading) {
      return <p>Loading...</p>;
    }
    if (error) {
      return <p>`Error: ${error.message}`</p>;
    }

  return (
    <>
      {data?.messages.map(({ id, user: messageUser, content }) => (
        <Message
          key={id}
          id={id}
          name={messageUser}
          content={content}
          localUser={messageUser === user}
        />
      ))}
    </>
  );
};

export default Messages;
