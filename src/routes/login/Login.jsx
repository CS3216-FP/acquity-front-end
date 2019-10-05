import React, { PureComponent } from 'react';
import LoginForm from './LoginForm';
import './Login.scss';

class Login extends PureComponent {
  render() {
    return (
      <div>
        <LoginForm />
      </div>
    );
  }
}

export default Login;
