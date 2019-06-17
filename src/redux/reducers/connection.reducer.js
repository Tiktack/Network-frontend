import { HubConnectionBuilder, LogLevel } from '@aspnet/signalr';
import { LOGIN_SUCCESS } from '../actionTypes/index';

const startSignalRConnection = connection => connection
  .start()
  .then(() => console.info('SignalR Connected'))
  .catch(err => console.error('SignalR Connection Error: ', err));

const initialStateObject = {
  on: () => {},
  off: () => {},
  invoke: () => {}
};

export const connection = (state = initialStateObject, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS: {
      const options = {
        logMessageContent: true,
        logger: LogLevel.Information,
        accessTokenFactory: () => action.payload.token
      };

      // create the connection instance
      const connectionCleint = new HubConnectionBuilder().withUrl('http://10.26.7.68:4000/messaging', options).build();

      // event handlers, you can use these to dispatch actions to update your Redux store
      // connection.on('OperationProgress', onNotifReceived);
      // connection.on('UploadProgress', onNotifReceived);
      // connection.on('DownloadProgress', onNotifReceived);

      // re-establish the connection if connection dropped
      connectionCleint.onclose(() => setTimeout(startSignalRConnection(connectionCleint), 5000));

      startSignalRConnection(connectionCleint);
      return connectionCleint;
    }
    default:
      return state;
  }
};
