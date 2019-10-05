import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';

import LoginForm from './LoginForm';
import './Login.scss';

class Login extends PureComponent {
  render() {
    return (
      <div className="section is-fullheight">
        <div className="container">
          <div className="column is-4 is-offset-4">
            <LoginForm />
            <div className="box has-text-centered">
              <span>Don&apos;t have an account yet? </span>
              <Link to="/signup">Sign up</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
