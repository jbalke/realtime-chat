import { gql } from '@apollo/client';

export const MESSAGE_SUBSCRIPTION = gql`
  subscription OnNewMessage {
    messageSent {
      id
      user
      content
    }
  }
`;
