/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Messages
// ====================================================

export interface Messages_messages {
  __typename: "Message";
  id: number;
  user: string;
  content: string;
}

export interface Messages {
  messages: Messages_messages[];
}
