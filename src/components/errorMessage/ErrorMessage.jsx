import React from 'react';

const ErrorMessage = ({ message, className = '' }) => {
  return (
    <article className={`${className} errorMessage message is-danger`}>
      <div className="errorMessage__message message-body">{message}</div>
    </article>
  );
};

export default ErrorMessage;
