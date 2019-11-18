import React from 'react';
import { Link } from 'react-router-dom';

import { CHAT } from 'constants/routes';

const ChatNav = ({ isShowingChatRoom, headerText }) => {
  return (
    <div className="chat__header columns">
      <div className="column is-full-mobile is-two-fifths-tablet chat__header__left">
        {isShowingChatRoom && (
          <Link
            to={CHAT}
            className="chat__header__back button button--cta button--nav--circle"
            type="button"
          >
            <i className="fas fa-arrow-left" />
          </Link>
        )}
        <span>Matches</span>
      </div>
      <div className="column is-hidden-mobile chat__header__right">
        <span className="chat__header__right--text">{headerText}</span>
      </div>
    </div>
  );
};

export default ChatNav;
