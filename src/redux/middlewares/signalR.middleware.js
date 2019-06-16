/* eslint-disable no-bitwise */
import { HubConnectionBuilder, LogLevel } from '@aspnet/signalr'; // version 1.0.4
import { LOGIN_SUCCESS } from '../actionTypes/index';

// const onNotifReceived = (res) => {
//   console.log('****** NOTIFICATION ******', res);
// };

const startSignalRConnection = connection => connection
  .start()
  .then(() => console.info('SignalR Connected'))
  .catch(err => console.error('SignalR Connection Error: ', err));

const signalRMiddleware = () => next => async (action) => {
  // register signalR after the user logged in
  if (action.type === LOGIN_SUCCESS) {
    const options = {
      logMessageContent: true,
      logger: LogLevel.Trace,
      accessTokenFactory: () => action.payload.token
    };

    // create the connection instance
    const connection = new HubConnectionBuilder().withUrl('http://10.26.7.68:4000/messaging', options).build();

    // event handlers, you can use these to dispatch actions to update your Redux store
    // connection.on('OperationProgress', onNotifReceived);
    // connection.on('UploadProgress', onNotifReceived);
    // connection.on('DownloadProgress', onNotifReceived);

    // re-establish the connection if connection dropped
    connection.onclose(() => setTimeout(startSignalRConnection(connection), 5000));

    startSignalRConnection(connection);
  }

  return next(action);
};

export default signalRMiddleware;
