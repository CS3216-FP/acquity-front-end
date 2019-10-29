import React from 'react';
import { Link } from 'react-router-dom';
import TimeAgo from 'react-timeago';

import { moneyFormatter } from 'utils/moneyUtils';
import './OrderItem.scss';

const OrderItem = ({ item, actionLink = null }) => {
  const lastUpdateTime = new Date(item.updatedAt * 1000);
  return (
    <div className="item">
      <div className="item__header">
        <span className="item__header__info">
          <span className="item__header__info__name">{item.securityName}</span>
        </span>
        <span className="item__header__timestamp">
          <TimeAgo
            title={lastUpdateTime.toLocaleString()}
            date={lastUpdateTime}
          />
        </span>
      </div>
      <div className="columns is-mobile">
        <div className="item__content column">
          <div className="columns">
            <div className="item__details column">
              <span className="item__details__label">Quantity:</span>
              <span className="item__details__value">
                {parseFloat(item.numberOfShares).toLocaleString()}
              </span>
            </div>
            <div className="item__details column">
              <span className="item__details__label">Price:</span>
              <span
                className="item__details__value"
                title={`$S ${item.price.toLocaleString()}`}
              >
                S$ {moneyFormatter(item.price)}
              </span>
            </div>
            <div className="item__details column">
              <span className="item__details__label">Estimated total:</span>
              <span
                className="item__details__value"
                title={`$S ${(
                  item.price * item.numberOfShares
                ).toLocaleString()}`}
              >
                S$ {moneyFormatter(item.price * item.numberOfShares)}
              </span>
            </div>
          </div>
        </div>
        {actionLink && (
          <div className="column is-narrow item__actionButton">
            <Link to={actionLink}>
              <button
                className="button button--cta button--nav--circle hvr-grow"
                type="button"
              >
                <i className="fas fa-arrow-right" />
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderItem;
