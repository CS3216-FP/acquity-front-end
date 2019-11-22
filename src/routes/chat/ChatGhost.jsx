import React from 'react';
import PageContainer from 'components/pageContainer';
import ChatListItemGhost from './chatList/ChatListItemGhost';

const ChatGhost = ({ isShowingChatRoom }) => {
  return (
    <PageContainer className="chat chatGhost">
      <div className="chat__header columns">
        <div className="column is-full-mobile is-two-fifths-tablet chat__header__left">
          {isShowingChatRoom && (
            <button
              disabled
              className="chat__header__back button button--cta button--nav--circle"
              type="button"
            >
              <i className="fas fa-arrow-left" />
            </button>
          )}
          <span>Matches</span>
        </div>
      </div>
      <div className="columns is-mobile is-gapless">
        <ul
          className={`chatrooms column ${
            isShowingChatRoom ? 'is-hidden-mobile' : 'is-full-mobile'
          } is-two-fifths-tablet`}
        >
          <ChatListItemGhost />
          <ChatListItemGhost />
          <ChatListItemGhost />
          <ChatListItemGhost />
        </ul>
      </div>
    </PageContainer>
  );
};

export default ChatGhost;
