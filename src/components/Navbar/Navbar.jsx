/* eslint-disable react/button-has-type */
import React, { useContext, useState, useEffect } from 'react';
import { Menu, Icon } from 'antd';
import { useSelector } from 'react-redux';
import AuthContext from '../../helpers/Context/AuthContext';
import { Outer, StyledLink } from './Navbar.styled.js';

const { SubMenu } = Menu;

export default function Navbar() {
  const auth = useContext(AuthContext);
  const [current, setCurrent] = useState('login');
  const user = useSelector(state => state.user);
  const path = useSelector(state => state.router.location.pathname);

  const logout = () => {
    localStorage.removeItem('token');
    auth.logout();
  };

  const handleClick = (e) => {
    setCurrent(e.key);
  };

  useEffect(() => {
    setCurrent(path.split('/')[1]);
  }, [path]);

  return (
    <Outer>
      <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
        {!user.id && (
          <Menu.Item key="login">
            <Icon type="login" />
            <StyledLink to="/login">Login</StyledLink>
          </Menu.Item>
        )}
        {!user.id && (
          <Menu.Item key="registration">
            <Icon type="user-add" />
            <StyledLink to="/registration">Registration</StyledLink>
          </Menu.Item>
        )}
        <Menu.Item key="dialogs">
          <Icon type="contacts" />
          <StyledLink to="/dialogs">Dialogs</StyledLink>
        </Menu.Item>
        <SubMenu
          title={(
            <span className="submenu-title-wrapper">
              <Icon type="setting" />
              User
            </span>
)}
        >
          <Menu.Item key="editprofile">
            <Icon type="edit" />
            <StyledLink to="/editprofile">Edit</StyledLink>
          </Menu.Item>
          <Menu.Item key="logout" onClick={() => logout()}>
            <Icon type="logout" />
            Logout
          </Menu.Item>
        </SubMenu>
      </Menu>
    </Outer>
  );
}
