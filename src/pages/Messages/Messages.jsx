/* eslint-disable react/no-array-index-key */
/* eslint-disable react/button-has-type */
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  List, Avatar, Input, Button
} from 'antd';
import { InputContainer, StyledList, StyledListItemMeta } from './Messages.styled';
import { getDialogs } from '../../redux/actions/dialogs.action';
import { addMessage } from '../../redux/actions/receiveMessage.action';

import { dialogSelector } from '../../redux/selectors';
import useHandleInputEnter from '../../hooks/useHandleInputEnter';

export default function Messages(props) {
  const [inputMessage, setInputMessage] = useState('');
  const connection = useSelector(state => state.connection);
  const dialog = useSelector(state => dialogSelector(state, props.match.params.id));
  const dispatch = useDispatch();

  const getTargetId = () => parseInt(props.match.params.id, 10);

  const sendMessage = () => {
    const id = getTargetId();
    connection.invoke('SendDirect', id, inputMessage).then(() => setInputMessage(''));
  };

  useEffect(() => {
    connection.on('UpdateDialog', message => dispatch(addMessage(message, props.match.params.id)));

    return () => connection.off('UpdateDialog');
  }, []);

  useEffect(() => {
    connection.on('GetDialogMessages', dialogMessages => dispatch(getDialogs(dialogMessages, props.match.params.id)));

    const id = getTargetId();
    connection.invoke('GetDialogMessages', id).then(() => connection.off('GetDialogMessages'));

    return () => connection.off('GetDialogMessages');
  }, [connection]);

  useHandleInputEnter('dialogInput', sendMessage);

  useEffect(() => {
    connection.on('MessageSent', message => dispatch(addMessage(message, props.match.params.id)));

    return () => connection.off('MessageSent');
  });

  return (
    <>
      <StyledList
        itemLayout="horizontal"
        dataSource={dialog}
        renderItem={item => (
          <List.Item>
            <StyledListItemMeta
              avatar={<Avatar src={item.pictureUrl} />}
              title={item.name}
              description={item.text}
              delivered={!!item.timestamp}
            />
          </List.Item>
        )}
      />
      <InputContainer>
        <Input id="dialogInput" type="text" value={inputMessage} onChange={e => setInputMessage(e.target.value)} />
        <Button onClick={sendMessage}>Send</Button>
      </InputContainer>
    </>
  );
}
