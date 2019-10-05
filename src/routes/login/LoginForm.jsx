import React from 'react';
import useForm from 'react-hook-form';

const LoginForm = () => {
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = data => console.log(data);

  return (
    <div className="box">
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
        <button type="submit" className="button is-block is-info is-fullwidth">
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
