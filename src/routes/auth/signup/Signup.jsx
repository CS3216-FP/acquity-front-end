import React from 'react';
import { Link } from 'react-router-dom';

import { useAuth } from 'contexts/authContext';
import SignupForm from './SignupForm';

const Signup = () => {
  const { register } = useAuth();

  return (
    <div className="content-container">
      <h1 className="form-title">Sign up</h1>
      <div className="form-wrapper">
        <SignupForm onSubmit={register} />
      </div>
      <div className="has-text-centered">
        <span>Already a member? </span>
        <Link to="/login">Log in</Link>
      </div>
    </div>
  );
};

export default Signup;
