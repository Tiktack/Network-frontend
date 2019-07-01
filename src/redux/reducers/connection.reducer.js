import { HubConnectionBuilder, LogLevel } from '@aspnet/signalr';
import { LOGIN_SUCCESS } from '../actionTypes/index';

const startSignalRConnection = connection => connection.start().catch((err) => {
  throw new Error(err);
});

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
        accessTokenFactory: () => action.payload
      };

      // create the connection instance
      const connectionCleint = new HubConnectionBuilder().withUrl('http://10.26.7.68:4000/messaging', options).build();


      // re-establish the connection if connection dropped
      connectionCleint.onclose(() => setTimeout(startSignalRConnection(connectionCleint), 5000));

      startSignalRConnection(connectionCleint);
      return connectionCleint;
    }
    default:
      return state;
  }
};
