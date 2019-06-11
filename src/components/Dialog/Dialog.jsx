/* eslint-disable react/no-array-index-key */
/* eslint-disable react/button-has-type */
import React, { useState, useEffect, useContext } from 'react';
import { connect } from 'react-redux';
import Message from '../Message';
import ConnectionContext from '../../helpers/Context/ConnectionContext';
import {
  Container, Input, InputContainer, List, Button
} from './Dialog.styled';
import { getDialogs } from '../../redux/actions/dialogs.action';
import { receiveMessage } from '../../redux/actions/receiveMessage.action';

import { dialogSelector } from '../../redux/selectors';


function Dialog(props) {
  const [myMessage, setMyMessage] = useState('');
  const context = useContext(ConnectionContext);

  const getTargetId = () => parseInt(props.match.params.id, 10);

  const sendMessage = () => {
    const id = getTargetId();
    context.invoke('SendDirect', id, myMessage).then(() => setMyMessage(''));
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

  return (
    <Container>
      <List>
        {props.dialog.map((x, i) => (
          <li key={i}>
            <Message message={x.text} />
          </li>
        ))}
      </List>
      <InputContainer>
        <Input id="dialogInput" type="text" value={myMessage} onChange={e => setMyMessage(e.target.value)} />
        <Button onClick={sendMessage}>Send</Button>
      </InputContainer>
    </Container>
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
