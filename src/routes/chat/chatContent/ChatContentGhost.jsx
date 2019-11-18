import React from 'react';
import Skeleton from 'react-loading-skeleton';

import Loading from 'components/loading';

import './ChatContentGhost.scss';

const ChatContentGhost = () => {
  return (
    <div className="column chat__content">
      <div className="chat__header column is-paddingless">
        <div className="chat__header__details--mobile">
          <Skeleton />
        </div>
        <div className="columns is-mobile is-marginless">
          <div className="chat__header__details column counterpartDetails">
            <div className="chat__header__details__header">
              <Skeleton />
            </div>
            <div className="chat__header__details__details columns is-marginless">
              <div className="column is-paddingless details">
                <span className="details__label">Quantity:</span>
                <span className="details__value">
                  <Skeleton />
                </span>
              </div>
              <div className="column is-paddingless details">
                <span className="details__label">Price:</span>
                <span className="details__value">
                  <Skeleton />
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="chat__header__actions columns is-gapless is-mobile">
          <button
            disabled
            type="button"
            className="column button is-success is-outlined"
          >
            Make Offer
          </button>
          <button
            disabled
            type="button"
            className="column button is-danger is-outlined"
          >
            Cancel Match
          </button>
        </div>
      </div>
      <div className="chatMessages">
        <Loading className="chatMessages__ghost" />
      </div>
      <div className="chatInput">
        <div className="columns is-marginless is-mobile is-gapless">
          <div className="column">
            <div className="form__field field has-addons">
              <div className="control is-expanded">
                <input
                  disabled
                  className="input"
                  type="text"
                  placeholder="Type a message..."
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatContentGhost;
