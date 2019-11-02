/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import SocketProvider from 'contexts/socketContext';
import Navbar from 'components/navbar';
import Main from 'routes/main';
import NewBid from 'routes/bids/newBid';
import EditBid from 'routes/bids/editBid';
import ProfileSettings from 'routes/settings/ProfileSettings';
import Chat from 'routes/chat';
import {
  UNAUTHED_ROUTES,
  ROOT,
  HOME,
  BIDS,
  OFFERS,
  CHAT,
  SETTINGS
} from 'constants/routes';

const redirectToRoot = () => <Redirect to={ROOT} />;

const AuthenticatedApp = () => {
  return (
    <SocketProvider>
      <Router>
        <div className="app">
          <Navbar isAuthenticated />
          <Switch>
            <Route exact path={UNAUTHED_ROUTES} render={redirectToRoot} />
            <Route exact path={HOME} component={Main} />
            <Route
              exact
              path={`${SETTINGS}/profile`}
              component={ProfileSettings}
            />
            <Route
              exact
              path={`${BIDS}/new`}
              render={props => (
                <NewBid {...props} apiEndpoint="buy_order" type="bid" />
              )}
            />
            <Route
              path={`${BIDS}/edit/:id`}
              render={props => (
                <EditBid {...props} apiEndpoint="buy_order" type="bid" />
              )}
            />
            <Route
              exact
              path={`${OFFERS}/new`}
              render={props => (
                <NewBid {...props} apiEndpoint="sell_order" type="offer" />
              )}
            />
            <Route
              path={`${OFFERS}/edit/:id`}
              render={props => (
                <EditBid {...props} apiEndpoint="sell_order" type="offer" />
              )}
            />
            <Route exact path={`${CHAT}/:chatRoomId?`} component={Chat} />
            <Route exact path="/" render={() => <Redirect to="/home" />} />
          </Switch>
        </div>
      </Router>
    </SocketProvider>
  );
};

export default AuthenticatedApp;
