import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react"
import store from './redux/store';
import { theme } from './theme/theme';

ReactDOM.render(
  <React.StrictMode>
    <Provider store = { store }>
      <ChakraProvider theme = { theme } resetCSS = {true}>
        <ColorModeScript />
        <App />
      </ChakraProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);