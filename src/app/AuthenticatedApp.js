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
import ProfileSettings from 'routes/settings/ProfileSettings';
import Chat from 'routes/chat';

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
          <Route exact path="/home" component={Main} />
          <Route exact path="/settings/profile" component={ProfileSettings} />
          <Route
            exact
            path="/bids/new"
            render={props => (
              <NewBid {...props} apiEndpoint="buy_order" type="bid" />
            )}
          />
          <Route
            path="/bids/edit/:id"
            render={props => (
              <EditBid {...props} apiEndpoint="buy_order" type="bid" />
            )}
          />
          <Route
            exact
            path="/offers/new"
            render={props => (
              <NewBid {...props} apiEndpoint="sell_order" type="offer" />
            )}
          />
          <Route
            path="/offers/edit/:id"
            render={props => (
              <EditBid {...props} apiEndpoint="sell_order" type="offer" />
            )}
          />
          <Route exact path="/matches/:chatRoomId?" component={Chat} />
          <Route exact path="/" render={() => <Redirect to="/home" />} />
        </Switch>
      </div>
    </Router>
  );
};

export default AuthenticatedApp;
