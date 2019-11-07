/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  useParams
} from 'react-router-dom';
import { useSocket } from 'contexts/socketContext';
import Navbar from 'components/navbar';
import Main from 'routes/main';
import NewBid from 'routes/bids/newBid';
import EditBid from 'routes/bids/editBid';
import ProfileSettings from 'routes/settings/ProfileSettings';
import Chat from 'routes/chat';
import { getChatConversation, getChatRooms } from 'reducers/ChatDux';
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
import { useUser } from 'contexts/userContext';
import { isCommittee } from 'utils/userUtils';
import { useDispatch } from 'react-redux';

const redirectToRoot = () => <Redirect to={ROOT} />;
const redirectToHome = () => <Redirect to={HOME} />;

const AuthenticatedApp = () => {
  const dispatch = useDispatch();
  const user = useUser();

  const adminRouting = () => {
    if (isCommittee(user)) {
      return <Admin />;
    }
    return redirectToHome();
  };

  const { openChatSocket, closeChatSocket } = useSocket();
  const { chatRoomId } = useParams();

  useEffect(() => {
    openChatSocket();
    dispatch(getChatRooms());
    if (chatRoomId) {
      dispatch(getChatConversation({ chatRoomId }));
    }
    return () => {
      closeChatSocket();
    };
  }, [chatRoomId, dispatch, openChatSocket, closeChatSocket]);

  return (
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
