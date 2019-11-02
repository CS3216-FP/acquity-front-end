import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';

import Login from 'routes/auth/login';

import Navbar from 'components/navbar';
import { LOGIN, LINKEDIN_CALLBACK, ROOT } from 'constants/routes';
import LinkedInCallback from 'routes/auth/linkedInCallback';

const redirectToLogin = () => <Redirect to={LOGIN} />;

const UnauthenticatedApp = () => {
  return (
    <Router>
      <div className="unauth app">
        <Navbar isAuthenticated={false} />
        <Switch>
          <Route path={LOGIN}>
            <Login />
          </Route>
          <Route path={`${LINKEDIN_CALLBACK}`}>
            <LinkedInCallback />
          </Route>
          <Route path={ROOT} render={redirectToLogin} />
        </Switch>
      </div>
    </Router>
  );
};

export default UnauthenticatedApp;
