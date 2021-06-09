/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL subscription operation: OnNewMessage
// ====================================================

export interface OnNewMessage_messageSent {
  __typename: "Message";
  id: number;
  user: string;
  content: string;
}

export interface OnNewMessage {
  messageSent: OnNewMessage_messageSent;
}
