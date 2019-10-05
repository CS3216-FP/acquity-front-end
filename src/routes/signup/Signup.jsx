import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';

import SignupForm from './SignupForm';

class Signup extends PureComponent {
  handleFormSubmit = data => console.log(data);

  render() {
    return (
      <div className="section is-fullheight">
        <div className="container">
          <div className="column is-4 is-offset-4">
            <div className="box">
              <h1 className="title">Sign up</h1>
              <SignupForm onSubmit={this.handleFormSubmit} />
            </div>
            <div className="box has-text-centered">
              <span>Already a member? </span>
              <Link to="/login">Log in</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Signup;
