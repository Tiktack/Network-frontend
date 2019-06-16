import { useContext, useEffect } from 'react';
import { notification } from 'antd';
import ConnectionContext from '../helpers/Context/ConnectionContext';

export const useMessageNotification = () => {
  const context = useContext(ConnectionContext);

  const openNotification = (message) => {
    notification.open({
      message: `Message from ${message.senderId}`,
      description: message.text
    });
  };

  useEffect(() => {
    context.on('UpdateDialog', (message) => {
      openNotification(message);
    });

    return () => context.off('UpdateDialog');
  }, []);
};
