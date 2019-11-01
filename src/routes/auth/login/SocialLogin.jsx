import React from 'react';
import LinkedinConstant from './linkedinConstant';

const SocialLogin = () => {
  const linkedInAuth = () => {
    window.open(LinkedinConstant.url, '_self');
  };
  return (
    <button
      onClick={() => linkedInAuth()}
      className="button is-info"
      type="button"
    >
      Activate Buyer Privileges
    </button>
  );
};

export default SocialLogin;
