import React from 'react';
import { Link } from 'react-router-dom';

import { useAuth } from 'contexts/authContext';
import AuthContainer from 'components/authContainer';
import SignupForm from './SignupForm';

import '../styles.scss';

const Signup = () => {
  const { register } = useAuth();

  return (
    <AuthContainer>
      <div className="content-container">
        <h1 className="form-title">Sign Up</h1>
        <div className="form-wrapper">
          <SignupForm onSubmit={register} />
        </div>

        <div className="actions">
          <div>
            <span className="text">Already a member? </span>
            <Link to="/login">Log in</Link>
          </div>
        </div>
      </div>
    </AuthContainer>
  );
};

export default Signup;
