import React, { useContext } from 'react';
import { ConnectedRouter } from 'connected-react-router';
import { Switch, Route } from 'react-router-dom';
import DialogList from '../components/DialogsList';
import Dialog from '../components/Dialog';
import { history } from './history';
import Home from '../components/Home';
import Navbar from '../components/Navbar';
import AuthContext from '../helpers/Context/AuthContext';


export default function Routing() {
  const auth = useContext(AuthContext);

  const handleAuthentication = (props) => {
    if (/access_token|id_token|error/.test(props.location.hash)) {
      auth.handleAuthentication(props);
    }
  };

  return (
    <ConnectedRouter history={history}>
      <Navbar />
      <Switch>
        <Route exact path="/" render={() => <Home />} />
        <Route exact path="/dialogs" render={() => <DialogList />} />
        <Route
          exact
          path="/callback"
          render={(props) => {
            handleAuthentication(props);
            return <div>Loading</div>;
          }}
        />
        <Route exact path="/dialog/:id" component={Dialog} />
      </Switch>
    </ConnectedRouter>
  );
}
