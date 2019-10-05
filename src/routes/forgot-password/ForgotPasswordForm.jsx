import React, { useState } from 'react';
import useForm from 'react-hook-form';

const ForgotPasswordForm = () => {
  const { register, handleSubmit, errors } = useForm();
  const [isSendingData, setIsSendingData] = useState(false);

  const onSubmit = data => {
    setIsSendingData(true);
    console.log(data);
  };

  return (
    <div className="box">
      <h1 className="title">Reset password</h1>
      <div className="content">
        Forgot your password? We will send password reset instructions to your
        email address below.
      </div>
      {}
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
            isSendingData ? 'is-loading' : ''
          }`}
        >
          Reset password
        </button>
      </form>
    </div>
  );
};

export default ForgotPasswordForm;
