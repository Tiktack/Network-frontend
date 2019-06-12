/* eslint-disable react/button-has-type */
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'antd';
import AuthContext from '../../helpers/Context/AuthContext';
import ConnectionContext from '../../helpers/Context/ConnectionContext';
import { Outer } from './Navbar.styled.js';

export default function Navbar() {
  const auth = useContext(AuthContext);
  const connection = useContext(ConnectionContext);

  const connect = () => {
    connection.start().then(() => console.log('Connection started!'));
  };

  const login = () => {
    auth.login();
  };

  const logout = () => {
    auth.logout();
  };

  return (
    <Outer>
      <Button onClick={() => login()}>Login</Button>
      <Button onClick={() => logout()}>logout</Button>
      <Button onClick={() => connect()}>Connect</Button>
      <Link to="/dialogs"><Button>Dialogs</Button></Link>
    </Outer>
  );
}
