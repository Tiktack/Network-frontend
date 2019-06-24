import React from 'react';
import { ConnectedRouter } from 'connected-react-router';
import { Switch, Route } from 'react-router-dom';
import styled from 'styled-components';
import Messages from '../pages/Messages';
import { history } from './history';
import Navbar from '../components/Navbar';
import { useMessageNotification } from '../hooks/useMessageNotification';
import WrappedNormalLoginForm from '../pages/Login';
import WrappedEditProfileForm from '../pages/EditProfile';
import useAuthentication from '../hooks/useAuthentication';
import Dialogs from '../pages/Dialogs';
import ReactEditor from '../components/EditorJS/EditorJS.jsx';

const Content = styled.div`
  margin-top: 3vh;
  margin-left: 25%;
  margin-right: 25%;
  width: 50%;
  height: 85vh;
`;

export default function Routing() {
  useMessageNotification();

  useAuthentication();

  return (
    <ConnectedRouter history={history}>
      <Navbar />
      <Content>
        <Switch>
          <Route exact path="/dialogs" component={Dialogs} />
          <Route exact path="/dialog/:id" component={Messages} />
          <Route exact path="/login" component={WrappedNormalLoginForm} />
          <Route exact path="/editprofile" component={WrappedEditProfileForm} />
          <Route exact path="/editorjs" component={ReactEditor} />
        </Switch>
      </Content>
    </ConnectedRouter>
  );
}
