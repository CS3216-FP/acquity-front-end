import React from 'react';
import { useDispatch } from 'react-redux';

import { hideBanner } from 'reducers/MiscDux';

import './NotificationBanner.scss';

const NotificationBanner = ({ headerText, contentText }) => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(hideBanner());
  };

  return (
    <section className="hero notificationBanner">
      <div className="container notificationBanner__container">
        <h1 className="notificationBanner__header">{headerText}</h1>
        <h2 className="notificationBanner__content">{contentText}</h2>
        <button
          onClick={handleClick}
          className="button notificationBanner__button"
          type="button"
        >
          Got it!
        </button>
        <div>
          <a href="mailto:support@mail.acquity.io">Email Support</a>
        </div>
      </div>
    </section>
  );
};

export default NotificationBanner;
