/* eslint-disable react/button-has-type */
import React, { useContext, useState } from 'react';
import { Menu, Icon } from 'antd';
import AuthContext from '../../helpers/Context/AuthContext';
import ConnectionContext from '../../helpers/Context/ConnectionContext';
import { Outer, StyledLink } from './Navbar.styled.js';

export default function Navbar() {
  const auth = useContext(AuthContext);
  const connection = useContext(ConnectionContext);
  const [current, setCurrent] = useState('login');

  const connect = () => {
    connection.start().then(() => console.log('Connection started!'));
  };

  const logout = () => {
    auth.logout();
  };

  const handleClick = (e) => {
    setCurrent(e.key);
  };

  return (
    <Outer>
      <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
        <Menu.Item key="login">
          <Icon type="login" />
          <StyledLink to="/login">Login</StyledLink>
        </Menu.Item>
        <Menu.Item key="logout" onClick={() => logout()}>
          <Icon type="logout" />
          Logout
        </Menu.Item>
        <Menu.Item key="connect" onClick={() => connect()}>
          <Icon type="redo" />
          Connect
        </Menu.Item>
        <Menu.Item key="dialogs">
          <Icon type="contacts" />
          <StyledLink to="/dialogs">Dialogs</StyledLink>
        </Menu.Item>
      </Menu>
    </Outer>
  );
}
