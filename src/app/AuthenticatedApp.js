import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';

import Main from 'routes/main';
import Navbar from 'components/navbar';

const AuthenticatedApp = () => {
  return (
    <Router>
      <div className="app section">
        <Navbar isAuthenticated />
        <Switch>
          <Route
            exact
            path={['/login', '/signup']}
            render={() => <Redirect to="/" />}
          />
          <Route path="/home/:page" component={Main} />

          <Route exact path="/" render={() => <Redirect to="/home/bids" />} />
        </Switch>
      </div>
    </Router>
  );
};

export default AuthenticatedApp;
