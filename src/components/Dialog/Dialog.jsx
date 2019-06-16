/* eslint-disable react/no-array-index-key */
/* eslint-disable react/button-has-type */
import React, { useState, useEffect, useContext } from 'react';
import { connect } from 'react-redux';
import {
  List, Avatar, Input, Button
} from 'antd';
import ConnectionContext from '../../helpers/Context/ConnectionContext';
import { InputContainer, StyledList } from './Dialog.styled';
import { getDialogs } from '../../redux/actions/dialogs.action';
import { receiveMessage } from '../../redux/actions/receiveMessage.action';

import { dialogSelector } from '../../redux/selectors';

function Dialog(props) {
  const [inputMessage, setInputMessage] = useState('');
  const context = useContext(ConnectionContext);

  const getTargetId = () => parseInt(props.match.params.id, 10);

  const sendMessage = () => {
    const id = getTargetId();
    context.invoke('SendDirect', id, inputMessage).then(() => setInputMessage(''));
  };

  useEffect(() => {
    context.on('UpdateDialog', message => props.receiveMessage(message, props.match.params.id));

    return () => context.off('UpdateDialog');
  }, []);

  useEffect(() => {
    context.on('GetDialogMessages', dialogMessages => props.getDialogs(dialogMessages, props.match.params.id));

    const id = getTargetId();
    context.invoke('GetDialogMessages', id).then(() => context.off('GetDialogMessages'));

    return () => context.off('GetDialogMessages');
  }, []);

  useEffect(() => {
    const handleType = (e) => {
      if (e.keyCode === 13) {
        sendMessage();
      }
    };

    const input = document.getElementById('dialogInput');
    input.addEventListener('keydown', handleType);
    return () => {
      input.removeEventListener('keydown', handleType);
    };
  });

  return (
    <>
      <StyledList
        itemLayout="horizontal"
        dataSource={props.dialog}
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
const mapStateToProps = (state, ownProps) => ({
  dialog: dialogSelector(state, ownProps.match.params.id)
});

const mapDispatchToProps = { getDialogs, receiveMessage };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dialog);
