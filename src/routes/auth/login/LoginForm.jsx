import React, { useState } from 'react';
import useForm from 'react-hook-form';
import { Link } from 'react-router-dom';

import './LoginForm.scss';

const LoginForm = ({ onSubmit }) => {
  const { register, handleSubmit, errors } = useForm();
  const [isPasswordShown, setIsPasswordShown] = useState(false);

  const togglePasswordShown = () => {
    if (isPasswordShown) {
      setIsPasswordShown(false);
    } else {
      setIsPasswordShown(true);
    }
  };

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)}>
      <div className="field">
        <label htmlFor="email" className="label">
          Email
        </label>
        <div className="control has-icons-left">
          <input
            id="email"
            className={`input ${errors.email ? 'is-danger' : ''}`}
            type="text"
            name="email"
            placeholder="example@you.com"
            ref={register({
              required: 'Email address is required',
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: 'Invalid email address'
              }
            })}
          />
          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>
          {errors.email && (
            <p className="help is-danger">{errors.email.message}</p>
          )}
        </div>
      </div>
      <div className="field">
        <label htmlFor="password" className="label">
          Password
        </label>
        <div className="control has-icons-left has-icons-right">
          <input
            id="password"
            className={`input ${errors.password ? 'is-danger' : ''}`}
            type={isPasswordShown ? 'text' : 'password'}
            name="password"
            ref={register({
              required: 'Password is required'
            })}
          />
          <span className="icon is-small is-left">
            <i className="fas fa-lock" />
          </span>
          <button
            type="button"
            onClick={togglePasswordShown}
            className="show-password icon is-small is-right"
          >
            {isPasswordShown ? (
              <i className="fas fa-eye-slash" />
            ) : (
              <i className="fas fa-eye" />
            )}
          </button>
          {errors.password && (
            <p className="help is-danger">{errors.password.message}</p>
          )}
        </div>
      </div>
      <div className="actions-wrapper">
        <Link className="forget-password-link" to="/forgot-password">
          Forgot password?
        </Link>
      </div>
      <button type="submit" className="login-button button is-block is-info">
        Log In
      </button>
    </form>
  );
};

export default LoginForm;
