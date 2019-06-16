import { useEffect } from 'react';
import { notification } from 'antd';
import { useSelector } from 'react-redux';
// import ConnectionContext from '../helpers/Context/ConnectionContext';

export const useMessageNotification = () => {
  // const context = useContext(ConnectionContext);
  const connection = useSelector(state => state.connection);

  const openNotification = (message) => {
    notification.open({
      message: `Message from ${message.senderId}`,
      description: message.text
    });
  };

  useEffect(() => {
    console.log(connection);
    connection.on('UpdateDialog', (message) => {
      openNotification(message);
    });

    return () => connection.off('UpdateDialog');
  });
};
