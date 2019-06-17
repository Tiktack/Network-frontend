import { useEffect } from 'react';
import { notification } from 'antd';
import { useSelector } from 'react-redux';

export const useMessageNotification = () => {
  const connection = useSelector(state => state.connection);

  const openNotification = (message) => {
    notification.open({
      message: `Message from ${message.senderId}`,
      description: message.text
    });
  };

  useEffect(() => {
    connection.on('UpdateDialog', (message) => {
      openNotification(message);
    });

    return () => connection.off('UpdateDialog');
  });
};
