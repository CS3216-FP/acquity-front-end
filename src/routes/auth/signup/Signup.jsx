import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';

import SignupForm from './SignupForm';

class Signup extends PureComponent {
  handleFormSubmit = data => console.log(data);

  render() {
    return (
      <div className="columns is-mobile is-centered">
        <div className="container-wrapper column is-two-thirds-tablet is-four-fifths-mobile">
          <h1 className="form-title">Sign up</h1>
          <div className="form-wrapper">
            <SignupForm onSubmit={this.handleFormSubmit} />
          </div>
          <div className="has-text-centered">
            <span>Already a member? </span>
            <Link to="/login">Log in</Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Signup;
