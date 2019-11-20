import React from 'react';
import Skeleton from 'react-loading-skeleton';

import './ChatListItem.scss';
import './ChatListItemGhost.scss';

const ChatListItemGhost = () => {
  return (
    <li role="row">
      <div className="chatroom__item columns is-mobile is-marginless chatListItemGhost">
        <div className="column is-narrow">
          <Skeleton circle height={48} width={48} />
        </div>
        <div className="column chatroom__item__details">
          <div className="detail__header">
            <div className="detail__header--name">
              <Skeleton />
            </div>
            <div className="detail__header--timeago">
              <Skeleton />
            </div>
          </div>
          <div className="columns">
            <div className="column">
              <div className="detail__header--security">
                <Skeleton />
              </div>
              <div className="chatListItemGhost__detail">
                <Skeleton />
              </div>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};

export default ChatListItemGhost;
