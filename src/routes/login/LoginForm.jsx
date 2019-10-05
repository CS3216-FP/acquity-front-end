import React from 'react';
import useForm from 'react-hook-form';
import { Link } from 'react-router-dom';

const LoginForm = () => {
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = data => console.log(data);

  return (
    <div className="box">
      <h1 className="title">Log in</h1>
      <form noValidate onSubmit={handleSubmit(onSubmit)}>
        <div className="field">
          <div className="control has-icons-left">
            <input
              className={`input ${errors.email && 'is-danger'}`}
              type="text"
              name="email"
              placeholder="Username or email address"
              ref={register({
                required: 'Username or email is required'
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
          <div className="control has-icons-left">
            <input
              className={`input ${errors.password && 'is-danger'}`}
              type="password"
              name="password"
              placeholder="Password"
              ref={register({
                required: 'Password is required'
              })}
              required
            />
            <span className="icon is-small is-left">
              <i className="fas fa-lock" />
            </span>
            {errors.password && (
              <p className="help is-danger">{errors.password.message}</p>
            )}
          </div>
        </div>
        <div className="field is-grouped">
          <Link className="forget-password-link" to="/forgot-password">
            Forgot password?
          </Link>
          <button type="submit" className="button is-block is-info">
            Log In
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
