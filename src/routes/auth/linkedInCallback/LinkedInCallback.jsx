import React, { useEffect, useState } from 'react';
import { useLocation, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import qs from 'qs';

import { useAuth } from 'contexts/authContext';
import AuthContainer from 'components/authContainer';

import '../styles.scss';
import '../login/TypeSelector.scss';
import './LinkedInCallback.scss';

const LinkedInCallback = () => {
  const { login } = useAuth();
  const location = useLocation();
  const { code } = qs.parse(location.search, {
    ignoreQueryPrefix: true
  });
  const { userType } = useSelector(state => state.misc);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    login({ code, userType }).catch(() => {
      setHasError(true);
    });
    // We must include the square brackets so as to only ensure login is called only once
  }, []);

  if (hasError) {
    return (
      <Redirect
        to={{
          pathname: '/login',
          error: true
        }}
      />
    );
  }

  return (
    <AuthContainer>
      <div className="login content-container linkedin-callback">
        <h1 className="form-title">Log In</h1>
        <div className="form-wrapper">
          <div className="login">
            <div className="login__type">
              <span className="login__type--text">I am a:</span>
              <div className="typeselector">
                <div className="typeselector__selected no-outline">
                  <span className="typeselector__selected--text">
                    {userType}
                  </span>
                </div>
              </div>
            </div>
            <div className="linkedin-callback__redirect">
              Logging in with LinkedIn...
            </div>
            <div className="login__action">
              <button
                type="button"
                disabled
                className="button button--cta hvr-grow login__button is-loading"
              >
                Login Now with LinkedIn
              </button>
            </div>
          </div>
        </div>

        <div className="actions">
          <span className="actions__signup">
            Don&apos;t have an account yet? <br />
            Just sign in with LinkedIn and we&apos;ll do the rest.
          </span>
        </div>
      </div>
    </AuthContainer>
  );
};

export default LinkedInCallback;
