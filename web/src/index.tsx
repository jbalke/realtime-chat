import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import { createGlobalStyle } from 'styled-components';
import { Theme } from './styles/style-constants';

const GlobalStyle = createGlobalStyle`
  :root {
    ${Theme.css.string}
  }
`;

ReactDOM.render(
  <>
    <GlobalStyle />
    <App />
  </>,
  document.getElementById('app')
);
