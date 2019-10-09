import React, { useReducer } from 'react';
import useForm from 'react-hook-form';
import './SignupForm.scss';

const LoginForm = ({ onSubmit }) => {
  const { register, handleSubmit, errors, getValues } = useForm({
    mode: 'onBlur'
  });

  const [state, setState] = useReducer((s, a) => ({ ...s, ...a }), {
    isPasswordShown: false,
    isConfirmPasswordShown: ''
  });

  const togglePasswordShown = () => {
    setState({ isPasswordShown: !state.isPasswordShown });
  };

  const toggleConfirmPasswordShown = () => {
    setState({ isConfirmPasswordShown: !state.isConfirmPasswordShown });
  };

  const passwordValidation = value => {
    const minLength = 10;
    const containsUpperRule = /[A-Z]/;
    const containsLowerRule = /[a-z]/;
    const containsNumberRule = /[0-9]/;

    const errorMessages = [];
    if (value.length < minLength) {
      errorMessages.push(`at least ${minLength} characters`);
    }
    if (!containsUpperRule.test(value)) {
      errorMessages.push('an uppercase character');
    }
    if (!containsLowerRule.test(value)) {
      errorMessages.push('a lowercase character');
    }
    if (!containsNumberRule.test(value)) {
      errorMessages.push('a number');
    }

    // No errors, validation passed
    if (errorMessages.length === 0) return true;

    return `Password is missing: ${errorMessages.join(', ')}`;
  };

  const passwordConfirmValidation = value => {
    const { password } = getValues();
    return value === password || "Passwords don't match";
  };

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)}>
      <div className="field">
        <label htmlFor="fullname-field" className="label">
          Full name
        </label>
        <div className="control">
          <input
            id="fullname-field"
            className={`input ${errors.fullname ? 'is-danger' : ''}`}
            type="text"
            autoComplete="name"
            placeholder="John Doe"
            name="fullname"
            ref={register({
              required: 'Full name is required'
            })}
          />

          {errors.fullname && (
            <p className="help is-danger">{errors.fullname.message}</p>
          )}
        </div>
      </div>
      <div className="field">
        <label htmlFor="email-field" className="label">
          Email address
        </label>
        <div className="control">
          <input
            id="email-field"
            className={`input ${errors.email ? 'is-danger' : ''}`}
            type="text"
            autoComplete="username"
            placeholder="you@example.com"
            name="email"
            ref={register({
              required: 'Email is required',
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
        <label htmlFor="password-field" className="label">
          Password
        </label>
        <div className="control has-icons-right">
          <input
            id="password-field"
            className={`input ${errors.password ? 'is-danger' : ''}`}
            type={state.isPasswordShown ? 'text' : 'password'}
            autoComplete="new-password"
            name="password"
            ref={register({
              required: 'Password is required',
              validate: passwordValidation
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
        </div>
        {!errors.password && (
          <p className="help">
            The password must contain at least 10 characters comprised of a
            number, a lowercase character, and an uppercase character
          </p>
        )}
        {errors.password && (
          <p className="help is-danger">{errors.password.message}</p>
        )}
      </div>
      <div className="field">
        <label htmlFor="confirm-password-field" className="label">
          Confirm password
        </label>
        <div className="control has-icons-right">
          <input
            id="confirm-password-field"
            className={`input ${errors.confirmPassword ? 'is-danger' : ''}`}
            type={state.isConfirmPasswordShown ? 'text' : 'password'}
            autoComplete="new-password"
            name="confirmPassword"
            ref={register({
              required: 'Password confirmation is required',
              validate: passwordConfirmValidation
            })}
          />
          <button
            type="button"
            onClick={toggleConfirmPasswordShown}
            className="show-password icon is-small is-right"
          >
            {state.isConfirmPasswordShown ? (
              <i className="fas fa-eye-slash" />
            ) : (
              <i className="fas fa-eye" />
            )}
          </button>
        </div>
        {errors.confirmPassword && (
          <p className="help is-danger">{errors.confirmPassword.message}</p>
        )}
      </div>
      <button
        type="submit"
        className="signup-button button is-block is-info is-fullwidth"
      >
        Register
      </button>
    </form>
  );
};

export default LoginForm;
