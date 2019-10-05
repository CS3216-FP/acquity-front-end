import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';

import LoginForm from './LoginForm';

class Login extends PureComponent {
  handleFormSubmit = data => console.log(data);

  render() {
    return (
      <div className="columns is-mobile is-centered">
        <div className="container-wrapper column is-two-thirds-tablet is-four-fifths-mobile">
          <h1 className="form-title">Log in</h1>
          <div className="form-wrapper">
            <LoginForm onSubmit={this.handleFormSubmit} />
          </div>
          <div className="has-text-centered">
            <span>Don&apos;t have an account yet? </span>
            <Link to="/signup">Sign up</Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
