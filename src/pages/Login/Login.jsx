import React, { useContext } from 'react';
import {
  Form, Icon, Input, Checkbox
} from 'antd';
import { useDispatch } from 'react-redux';
import { Link as LinkRouter } from 'react-router-dom';
import { Link, StyledButton, StyledForm } from './SignIn.styled';
import AuthContext from '../../helpers/Context/AuthContext';
import { login } from '../../redux/actions/account.action';

const SignIn = (props) => {
  const auth = useContext(AuthContext);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        const { username, password } = values;
        dispatch(login(username, password));
      }
    });
  };
  const loginWithAuth0 = () => {
    auth.login();
  };

  const { getFieldDecorator } = props.form;
  return (
    <StyledForm onSubmit={handleSubmit} className="login-form">
      <Form.Item>
        {getFieldDecorator('username', {
          rules: [{ required: true, message: 'Please input your username!' }]
        })(<Input prefix={<Icon type="user" style={{ color: 'black' }} />} placeholder="Username" />)}
      </Form.Item>
      <Form.Item>
        {getFieldDecorator('password', {
          rules: [{ required: true, message: 'Please input your Password!' }]
        })(<Input prefix={<Icon type="lock" style={{ color: 'black' }} />} type="password" placeholder="Password" />)}
      </Form.Item>
      <Form.Item>
        {getFieldDecorator('remember', {
          valuePropName: 'checked',
          initialValue: true
        })(<Checkbox>Remember me</Checkbox>)}
        <Link to="/dialogs">Forgot password</Link>
        <StyledButton type="primary" htmlType="submit">
          Log in
        </StyledButton>
        <StyledButton type="primary" onClick={() => loginWithAuth0()}>
          Log in with Auth0
        </StyledButton>
        Or
        {' '}
        <LinkRouter to="/registration">register now!</LinkRouter>
      </Form.Item>
    </StyledForm>
  );
};
const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(SignIn);

export default WrappedNormalLoginForm;
