import React from 'react';
import { hot } from 'react-hot-loader';
import { HubConnectionBuilder, LogLevel } from '@aspnet/signalr';
import styled from 'styled-components';
import { Provider } from 'react-redux';
import Auth from './helpers/Auth/Auth.js';
import AuthContext from './helpers/Context/AuthContext';
import ConnectionContext from './helpers/Context/ConnectionContext';
import store from './redux/store';
import Routing from './routing';

const auth = new Auth();

const connection = new HubConnectionBuilder()
  .withUrl('http://10.26.7.68:4000/messaging', {
    accessTokenFactory: () => auth.getAccessToken()
  })
  .configureLogging(LogLevel.Information)
  .build();

const Dark = styled.div`
  background-color: #222226;
  position: fixed;
  padding: 0;
  margin: 0;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const App = () => (
  <Dark>
    <ConnectionContext.Provider value={connection}>
      <AuthContext.Provider value={auth}>
        <Provider store={store}>
          <Routing />
        </Provider>
      </AuthContext.Provider>
    </ConnectionContext.Provider>
  </Dark>
);

export default hot(module)(App);
