import React, { useReducer } from 'react';
import useForm from 'react-hook-form';
import { Link } from 'react-router-dom';

import './LoginForm.scss';

const LoginForm = ({ onSubmit }) => {
  const { register, handleSubmit: validateInputs, errors } = useForm();
  const [state, setState] = useReducer((s, a) => ({ ...s, ...a }), {
    isPasswordShown: false,
    isLoading: false,
    loginErrorMessage: ''
  });

  const handleSubmit = form => {
    setState({ isLoading: true });
    onSubmit(form).catch(() => {
      setState({
        isLoading: false,
        loginErrorMessage: 'Incorrect username or password.'
      });
    });
  };

  const handleNotificationClose = () => {
    setState({
      loginErrorMessage: ''
    });
  };

  const togglePasswordShown = () => {
    setState({ isPasswordShown: !state.isPasswordShown });
  };

  return (
    <form noValidate onSubmit={validateInputs(handleSubmit)}>
      {state.loginErrorMessage && (
        <div className="notification is-danger">
          <button
            onClick={handleNotificationClose}
            aria-label="close notification"
            type="button"
            className="delete"
          />
          {state.loginErrorMessage}
        </div>
      )}
      <div className="field">
        <label htmlFor="email" className="label">
          Email
        </label>
        <div className="control">
          <input
            id="email"
            className={`input ${errors.email ? 'is-danger' : ''}`}
            type="text"
            name="email"
            placeholder="you@example.com"
            ref={register({
              required: 'Email address is required',
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: 'Invalid email address'
              }
            })}
          />
          {errors.email && (
            <p className="help is-danger">{errors.email.message}</p>
          )}
        </div>
      </div>
      <div className="field">
        <label htmlFor="password" className="label">
          Password
        </label>
        <div className="control has-icons-right">
          <input
            id="password"
            className={`input ${errors.password ? 'is-danger' : ''}`}
            type={state.isPasswordShown ? 'text' : 'password'}
            name="password"
            ref={register({
              required: 'Password is required'
            })}
          />
          <button
            type="button"
            onClick={togglePasswordShown}
            className="show-password icon is-small is-right"
          >
            {state.isPasswordShown ? (
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
      <button
        type="submit"
        className={`login-button button is-block is-info ${
          state.isLoading ? 'is-loading' : ''
        }`}
      >
        Log In
      </button>
    </form>
  );
};

export default LoginForm;
