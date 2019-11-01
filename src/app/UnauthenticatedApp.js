import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';

import Login from 'routes/auth/login';
import LoginCallback from 'routes/auth/login/LoginCallback';
import Signup from 'routes/auth/signup';
import ForgotPassword from 'routes/auth/forgot-password';

import Navbar from 'components/navbar';

const UnauthenticatedApp = () => {
  return (
    <Router>
      <div className="unauth app">
        <Navbar isAuthenticated={false} />
        <Switch>
          <Route path="/signup">
            <Signup />
          </Route>
          <Route path="/forgot-password">
            <ForgotPassword />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/auth/callback">
            <LoginCallback />
          </Route>
          <Route path="/" render={() => <Redirect to="/login" />} />
        </Switch>
      </div>
    </Router>
  );
};

export default UnauthenticatedApp;
