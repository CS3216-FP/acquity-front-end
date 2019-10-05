import React from 'react';
import useForm from 'react-hook-form';

const ForgotPasswordForm = ({ onSubmit, isSubmitting }) => {
  const { register, handleSubmit, errors } = useForm();

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)}>
      <div className="field">
        <label htmlFor="email" className="label">
          Email address
        </label>
        <div className="control">
          <input
            id="email"
            className={`input ${errors.email && 'is-danger'}`}
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
      <button
        type="submit"
        className={`button is-block is-info is-fullwidth ${
          isSubmitting ? 'is-loading' : ''
        }`}
      >
        Request reset link
      </button>
    </form>
  );
};

export default ForgotPasswordForm;
