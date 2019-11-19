import React from 'react';
import { Link } from 'react-router-dom';
import TimeAgo from 'react-timeago';

import { useUser } from 'contexts/userContext';
import { addCommasToNumber } from 'utils';
import { isUnapprovedBuyer } from 'utils/userUtils';
import { moneyFormatter, toCurrency } from 'utils/moneyUtils';
import './OrderItem.scss';

const OrderItem = ({ item, actionLink = null, className = '' }) => {
  const user = useUser();
  const lastUpdateTime = new Date(item.updatedAt * 1000);
  return (
    <div className={`item ${className}`}>
      <div className="item__header">
        <span className="item__header__info">
          <span className="item__header__info__name">{item.securityName}</span>
          {isUnapprovedBuyer(user) && (
            <span className="item__header__info--pending">
              Account pending approval
            </span>
          )}
        </span>
        <span className="item__header__timestamp">
          <TimeAgo
            title={lastUpdateTime.toLocaleString()}
            date={lastUpdateTime}
          />
        </span>
      </div>
      <div className="item__content columns is-mobile">
        <div className="column">
          <div className="columns">
            <div className="item__details column">
              <span className="item__details__label">Quantity:</span>
              <span className="item__details__value">
                {addCommasToNumber(item.numberOfShares)}
              </span>
            </div>
            <div className="item__details column">
              <span className="item__details__label">Price:</span>
              <span
                className="item__details__value"
                title={toCurrency(item.price)}
              >
                {toCurrency(item.price)}
              </span>
            </div>
            <div className="item__details column">
              <span className="item__details__label">Estimated total:</span>
              <span
                className="item__details__value"
                title={toCurrency(item.price * item.numberOfShares)}
              >
                US${moneyFormatter(item.price * item.numberOfShares)}
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
