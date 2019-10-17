import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';

import Login from 'routes/auth/login';
import Signup from 'routes/auth/signup';
import ForgotPassword from 'routes/auth/forgot-password';

import 'routes/auth/styles.scss';
import Navbar from 'components/navbar';

const UnauthenticatedApp = () => {
  return (
    <Router>
      <div className="app section">
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
          <Route path="/" render={() => <Redirect to="/login" />} />
        </Switch>
      </div>
    </Router>
  );
};

export default UnauthenticatedApp;
