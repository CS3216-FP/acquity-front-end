/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';

import Navbar from 'components/navbar';
import Main from 'routes/main';
import NewBid from 'routes/bids/newBid';
import EditBid from 'routes/bids/editBid';

const AuthenticatedApp = () => {
  return (
    <Router>
      <div className="app">
        <Navbar isAuthenticated />
        <Switch>
          <Route
            exact
            path={['/login', '/signup']}
            render={() => <Redirect to="/" />}
          />
          <Route path="/home" component={Main} />
          <Route
            exact
            path="/bids/new"
            render={props => <NewBid {...props} apiEndpoint="buy_order" />}
          />
          <Route
            path="/bids/edit/:id"
            render={props => <EditBid {...props} apiEndpoint="buy_order" />}
          />
          <Route
            exact
            path="/offers/new"
            render={props => <NewBid {...props} apiEndpoint="sell_order" />}
          />
          <Route
            path="/offers/edit/:id"
            render={props => <EditBid {...props} apiEndpoint="sell_order" />}
          />
          <Route exact path="/" render={() => <Redirect to="/home" />} />
        </Switch>
      </div>
    </Router>
  );
};

export default AuthenticatedApp;
