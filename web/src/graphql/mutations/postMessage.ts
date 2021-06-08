import { gql } from '@apollo/client';

export const POST_MESSAGE = gql`
  mutation PostMessage($user: String!, $content: String!) {
    postMessage(data: { user: $user, content: $content })
  }
`;
