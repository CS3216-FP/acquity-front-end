import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';

import Main from 'routes/main';
import Navbar from 'components/navbar';

const AuthenticatedApp = () => {
  return (
    <Router>
      <div className="app">
        <Navbar isAuthenticated />
        <div className="columns is-marginless is-mobile is-centered">
          <div className="is-container column is-two-thirds-tablet is-four-fifths-mobile">
            <SimpleBar>
              <Switch>
                <Route
                  exact
                  path={['/login', '/signup']}
                  render={() => <Redirect to="/" />}
                />
                <Route path="/">
                  <Main />
                </Route>
              </Switch>
            </SimpleBar>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default AuthenticatedApp;
