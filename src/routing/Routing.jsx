import React, { useContext } from 'react';
import { ConnectedRouter } from 'connected-react-router';
import { Switch, Route } from 'react-router-dom';
import styled from 'styled-components';
import { connect } from 'react-redux';
import DialogList from '../components/DialogsList';
import Dialog from '../components/Dialog';
import { history } from './history';
import Home from '../components/Home';
import Navbar from '../components/Navbar';
import AuthContext from '../helpers/Context/AuthContext';
import { useMessageNotification } from '../hooks/useMessageNotification';
import WrappedNormalLoginForm from '../pages/SignIn';
import { loginWithExternals } from '../redux/actions/autentication.action';

const Content = styled.div`
  margin-top: 3vh;
  margin-left: 25%;
  margin-right: 25%;
  width: 50%;
  height: 85vh;
`;

function Routing(props) {
  const auth = useContext(AuthContext);

  useMessageNotification();

  const handleAuthentication = (propsFunction, login) => {
    if (/access_token|error/.test(propsFunction.location.hash)) {
      auth.handleAuthentication(login);
    }
  };

  return (
    <ConnectedRouter history={history}>
      <Navbar />
      <Content>
        <Switch>
          <Route exact path="/" render={() => <Home />} />
          <Route exact path="/dialogs" render={() => <DialogList />} />
          <Route
            exact
            path="/callback"
            render={(x) => {
              handleAuthentication(x, props.loginWithExternals);
              return <div>Loading</div>;
            }}
          />
          <Route exact path="/dialog/:id" component={Dialog} />
          <Route exact path="/login" component={WrappedNormalLoginForm} />
        </Switch>
      </Content>
    </ConnectedRouter>
  );
}

const mapDispatchToProps = { loginWithExternals };

export default connect(
  null,
  mapDispatchToProps
)(Routing);
