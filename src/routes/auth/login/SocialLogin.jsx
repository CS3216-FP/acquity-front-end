import React from 'react';

const SocialLogin = () => {
  const responseType = 'code';
  const clientId = '86awajx9exc3d8';
  const redirectUri = `${process.env.REACT_APP_REDIRECT_URI}`;
  const scope =
    'r_liteprofile%20r_emailaddress%20w_member_social%20r_basicprofile';
  const url = `https://www.linkedin.com/oauth/v2/authorization?response_type=${responseType}&client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}`;
  const linkedInAuth = () => {
    window.open(url, '_self');
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
