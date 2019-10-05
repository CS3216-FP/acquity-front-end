import React, { useState } from 'react';
import useForm from 'react-hook-form';
import './SignupForm.scss';

const LoginForm = ({ onSubmit }) => {
  const { register, handleSubmit, errors, getValues, formState } = useForm({
    mode: 'onBlur'
  });
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const [isConfirmPasswordShown, setIsConfirmPasswordShown] = useState(false);

  function togglePasswordShown() {
    if (isPasswordShown) {
      setIsPasswordShown(false);
    } else {
      setIsPasswordShown(true);
    }
  }
  function toggleConfirmPasswordShown() {
    if (isConfirmPasswordShown) {
      setIsConfirmPasswordShown(false);
    } else {
      setIsConfirmPasswordShown(true);
    }
  }

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
      <div className="field-body">
        <div className="field">
          <label htmlFor="firstname" className="label">
            First name
          </label>
          <div className="control">
            <input
              id="firstname"
              className={`input ${errors.firstname ? 'is-danger' : ''}`}
              type="text"
              placeholder="John"
              name="firstname"
              ref={register({
                required: 'First name is required'
              })}
            />

            {errors.firstname && (
              <p className="help is-danger">{errors.firstname.message}</p>
            )}
          </div>
        </div>
        <div className="field">
          <label htmlFor="lastname" className="label">
            Last name
          </label>
          <div className="control">
            <input
              id="lastname"
              className={`input ${errors.lastname ? 'is-danger' : ''}`}
              type="text"
              name="lastname"
              placeholder="Doe"
              ref={register({
                required: 'Last name is required'
              })}
            />

            {errors.lastname && (
              <p className="help is-danger">{errors.lastname.message}</p>
            )}
          </div>
        </div>
      </div>
      <div className="field">
        <label htmlFor="email" className="label">
          Email address
        </label>
        <div className="control">
          <input
            id="email"
            className={`input ${errors.email ? 'is-danger' : ''}`}
            type="text"
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
        <label htmlFor="password" className="label">
          Password
        </label>
        <div className="control has-icons-right">
          <input
            id="password"
            className={`input ${errors.password ? 'is-danger' : ''}`}
            type={isPasswordShown ? 'text' : 'password'}
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
            {isPasswordShown ? (
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
        <label htmlFor="confirmPassword" className="label">
          Confirm password
        </label>
        <div className="control has-icons-right">
          <input
            id="confirmPassword"
            className={`input ${errors.confirmPassword ? 'is-danger' : ''}`}
            type={isConfirmPasswordShown ? 'text' : 'password'}
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
            {isConfirmPasswordShown ? (
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
      <div className="field">
        <label htmlFor="referral" className="label">
          Referral code
        </label>
        <div className="control">
          <input id="referral" className="input" type="text" name="referral" />
        </div>
        <p className="help">
          Enter a referral code if you received one from a registered user
        </p>
      </div>
      <button
        disabled={
          formState.touched.length !== 5 || Object.keys(errors).length !== 0
        }
        type="submit"
        className="button is-block is-info is-fullwidth"
      >
        Register
      </button>
    </form>
  );
};

export default LoginForm;
