import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import withAuth from 'utils/withAuth';

import Main from 'routes/main';
import Login from 'routes/auth/login';
import Signup from 'routes/auth/signup';
import ForgotPassword from 'routes/auth/forgot-password';

import 'routes/auth/styles.scss';
import Navbar from 'components/navbar';

const App = () => {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/signup">
            <Signup />
          </Route>
          <Route path="/forgot-password">
            <ForgotPassword />
          </Route>
          <Route exact path="/" component={withAuth(Main)} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
