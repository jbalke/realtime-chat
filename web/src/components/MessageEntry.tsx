import { useMutation } from '@apollo/client';
import React, { ChangeEvent, FormEvent, SyntheticEvent, useState } from 'react';
import { FunctionComponent } from 'react';
import styled from 'styled-components';
import { PostMessage, PostMessageVariables } from '../generated/PostMessage';
import { POST_MESSAGE } from '../graphql/mutations/postMessage';
import { Theme } from '../styles/style-constants';

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

const MessageEntry: FunctionComponent<{
  setName: (evt: ChangeEvent<HTMLInputElement>) => void;
  formValues: { user: string   };
}> = ({ setName, formValues:   {   user   } }) => {
  const [message, setMessage] = useState('');

  const [postMessage, { data, loading, error }] =
    useMutation<PostMessage, PostMessageVariables>(POST_MESSAGE);

  const handleSubmit = (evt: SyntheticEvent) => {
    evt.preventDefault();

    if (message.length > 0) {
      postMessage({ variables: { content: message, user } });
      setMessage('');
    }
  };

  return (
    <StyledForm onSubmit={handleSubmit}>
      <input
        type='text'
        onChange={setName}
        value={user}
        placeholder='Name'
        required
      />
      <input
        type='text'
        onChange={(evt) => setMessage(evt.target.value)}
        value={message}
        placeholder='Message'
        required
      />
      <input type='submit' value='Submit' />
    </StyledForm>
  );
};

export default MessageEntry;
