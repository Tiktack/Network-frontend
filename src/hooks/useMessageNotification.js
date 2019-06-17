import { useEffect } from 'react';
import { notification } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { addMessage } from '../redux/actions/receiveMessage.action';

export const useMessageNotification = () => {
  const connection = useSelector(state => state.connection);
  const location = useSelector(state => state.router.location);
  const dispatch = useDispatch();

  const openNotification = (message) => {
    notification.open({
      message: `Message from ${message.senderId}`,
      description: message.text
    });
  };

  const getCurrentDialogId = () => {
    if (location.pathname.includes('dialog')) {
      const array = location.pathname.split('/');
      const id = array[array.length - 1];
      return parseInt(id, 10);
    }
    return 0;
  };

  useEffect(() => {
    connection.on('UpdateDialog', (message) => {
      const currentDialogId = getCurrentDialogId();
      if (currentDialogId !== message.senderId) openNotification(message);
      dispatch(addMessage(message, message.senderId));
    });

    connection.on('MessageSent', message => dispatch(addMessage(message, message.receiverId)));

    return () => {
      connection.off('UpdateDialog');
      connection.off('MessageSent');
    };
  });
};
