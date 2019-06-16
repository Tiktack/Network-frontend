const initialStateObject = {};

export const connection = (state = initialStateObject, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS: {
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
      return connection;
    }
    default:
      return state;
  }
};
