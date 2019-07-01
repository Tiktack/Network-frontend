/* eslint-disable react/no-array-index-key */
/* eslint-disable react/button-has-type */
import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  List, Avatar, Input, Button
} from 'antd';
import { InputContainer, StyledList } from './Messages.styled';
import useHandleInputEnter from '../../hooks/useHandleInputEnter';
import { GET_DIALOG_MESSAGES } from '../../redux/actionTypes';

export default function Messages(props) {
  const [inputMessage, setInputMessage] = useState('');
  const connection = useSelector(state => state.connection);
  const dialog = useSelector(state => state.dialogs[props.match.params.id]);
  const dispatch = useDispatch();

  const getTargetId = useCallback(() => props.match.params.id, [props.match.params.id]);

  const sendMessage = () => {
    const id = getTargetId();
    connection.invoke('SendDirect', id, inputMessage).then(() => setInputMessage(''));
  };

  useEffect(() => {
    connection.on('GetDialogMessages', dialogMessages => dispatch({ type: GET_DIALOG_MESSAGES, payload: { array: dialogMessages, id: getTargetId() } }));

    connection.invoke('GetDialogMessages', getTargetId());

    return () => connection.off('GetDialogMessages');
  }, [connection, dispatch, getTargetId, props.match.params.id]);

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
