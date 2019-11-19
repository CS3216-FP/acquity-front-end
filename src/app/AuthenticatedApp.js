/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import { useSelector } from 'react-redux';

import { useUser } from 'contexts/userContext';
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
  SETTINGS,
  ADMIN
} from 'constants/routes';
import Admin from 'routes/admin/Admin';
import { isCommittee } from 'utils/userUtils';
import NotificationBanner from 'components/notificationBanner';

const redirectToRoot = () => <Redirect to={ROOT} />;
const redirectToHome = () => <Redirect to={HOME} />;

const AuthenticatedApp = () => {
  const user = useUser();
  const isBannerHidden = useSelector(state => state.misc.isBannerHidden);

  const adminRouting = () => {
    if (isCommittee(user)) {
      return <Admin />;
    }
    return redirectToHome();
  };

  return (
    <Router>
      {!isBannerHidden && (
        <NotificationBanner
          headerText="We have just released an update to change all currencies from SGD to USD"
          contentText="To ensure that all users who have already joined our round are not affected by this change, all bids and asks have been cancelled. You will need to create them again. We apologise for any inconvenience caused."
        />
      )}
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
              <NewBid {...props} apiEndpoint="sell_order" type="ask" />
            )}
          />
          <Route
            path={`${OFFERS}/edit/:id`}
            render={props => (
              <EditBid {...props} apiEndpoint="sell_order" type="ask" />
            )}
          />
          <Route path={ADMIN} render={adminRouting} />
          <Route exact path={`${CHAT}/:chatRoomId?`} component={Chat} />
          <Route exact path="/" render={redirectToHome} />
        </Switch>
      </div>
    </Router>
  );
};

export default AuthenticatedApp;
