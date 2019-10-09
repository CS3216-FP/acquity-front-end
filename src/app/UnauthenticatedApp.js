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
      <div className="app">
        <Navbar isAuthenticated={false} />
        <div className="columns is-marginless is-mobile is-centered">
          <div className="is-container column is-two-thirds-tablet is-four-fifths-mobile">
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
              <Route exact path="/" render={() => <Redirect to="/login" />} />
            </Switch>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default UnauthenticatedApp;
