/* eslint-disable react/no-array-index-key */
/* eslint-disable react/button-has-type */
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  List, Avatar, Input, Button
} from 'antd';
import { InputContainer, StyledList } from './Messages.styled';
import { getDialogs } from '../../redux/actions/dialogs.action';

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
    connection.on('GetDialogMessages', dialogMessages => dispatch(getDialogs(dialogMessages, props.match.params.id)));

    const id = getTargetId();
    connection.invoke('GetDialogMessages', id).then(() => connection.off('GetDialogMessages'));

    return () => connection.off('GetDialogMessages');
  }, [connection]);

  useHandleInputEnter('dialogInput', sendMessage);

  return (
    <>
      <StyledList
        itemLayout="horizontal"
        dataSource={dialog}
        renderItem={item => (
          <List.Item>
            <List.Item.Meta avatar={<Avatar src={item.pictureUrl} />} title={item.name} description={item.text} />
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
