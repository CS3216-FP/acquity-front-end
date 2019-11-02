import React from 'react';
import { useAsync } from 'react-async';

import AuthService from 'services/authService';

import FullPageSpinner from 'components/FullPageSpinner';

const AuthContext = React.createContext();

const AuthProvider = props => {
  const [firstAttemptFinished, setFirstAttemptFinished] = React.useState(false);
  const {
    data = null,
    error,
    isRejected,
    isPending,
    isSettled,
    reload
  } = useAsync({
    promiseFn: AuthService.getUser
  });

  React.useLayoutEffect(() => {
    if (isSettled) {
      setFirstAttemptFinished(true);
    }
  }, [isSettled]);

  if (!firstAttemptFinished) {
    if (isPending) {
      return <FullPageSpinner />;
    }
    if (isRejected) {
      return (
        <div css={{ color: 'red' }}>
          <p>Uh oh... There&apos;s a problem. Try refreshing the app.</p>
          <pre>{error.message}</pre>
        </div>
      );
    }
  }
  const login = code =>
    AuthService.login(code)
      .then(reload)
      .catch(e => {
        return Promise.reject(e);
      });
  const logout = () => AuthService.logout().then(reload);

  return (
    <AuthContext.Provider
      value={{ data, login, logout }}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    />
  );
};
const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error(`useAuth must be used within a AuthProvider`);
  }
  return context;
};
export { AuthProvider, useAuth };
