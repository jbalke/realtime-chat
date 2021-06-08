/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetMessages
// ====================================================

export interface GetMessages_messages {
  __typename: "Message";
  id: number;
  user: string;
  content: string;
}

export interface GetMessages {
  messages: GetMessages_messages[];
}
