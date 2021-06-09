import React, { ChangeEvent, FormEvent, SyntheticEvent } from 'react';
import { FunctionComponent } from 'react';
import styled from 'styled-components';
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
  handleSubmit: (evt: SyntheticEvent) => void;
  setName: (evt: ChangeEvent<HTMLInputElement>) => void;
  setContent: (evt: ChangeEvent<HTMLInputElement>) => void;
  formValues: { user: string; content: string };
}> = ({ handleSubmit, setName, setContent, formValues }) => {
  return (
    <StyledForm onSubmit={handleSubmit}>
      <input
        type='text'
        onChange={setName}
        value={formValues.user}
        placeholder='Name'
        required
      />
      <input
        type='text'
        onChange={setContent}
        value={formValues.content}
        placeholder='Message'
        required
      />
      <input type='submit' value='Submit' />
    </StyledForm>
  );
};

export default MessageEntry;
