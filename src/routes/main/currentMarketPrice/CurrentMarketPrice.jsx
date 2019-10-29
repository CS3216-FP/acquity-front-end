import React, { useReducer, useEffect } from 'react';
import Modal from 'react-modal';

import 'assets/scss/modal.scss';

import { LANDING_URL } from 'constants/urls';
import CurrentMarketPriceGhost from './CurrentMarketPriceGhost';
import './CurrentMarketPrice.scss';

const CurrentMarketPrice = () => {
  const [state, setState] = useReducer((s, a) => ({ ...s, ...a }), {
    isLoading: true,
    isModalOpen: false,
    marketPrice: null
  });

  // TODO: hook up to backend to get current selected security's current market price.
  useEffect(() => {
    setTimeout(() => {
      setState({ isLoading: false, marketPrice: '6.18' });
    }, 250);
  }, []);

  const handleOpenModalClick = () => {
    setState({ isModalOpen: true });
  };

  const handleCloseModal = () => {
    setState({ isModalOpen: false });
  };

  if (state.isLoading) {
    return <CurrentMarketPriceGhost />;
  }

  return (
    <div className="currentMarketPrice">
      <div className="details__header">Current market price</div>
      <div className="currentMarketPrice__price">
        <span className="currentMarketPrice__price--price">
          SGD {state.marketPrice}
        </span>
        <span className="currentMarketPrice__price--label">/share</span>
      </div>
      <button
        type="button"
        onClick={handleOpenModalClick}
        className="currentMarketPrice__disclaimer as-non-button"
      >
        <span className="icon">
          <i className="fas fa-question-circle" />
        </span>
        <span className="currentMarketPrice__disclaimer--text">
          Where do we get this value from?
        </span>
      </button>

      <Modal
        className="modal__content"
        overlayClassName="modal__overlay"
        isOpen={state.isModalOpen}
        onRequestClose={handleCloseModal}
        contentLabel="Where do we get this value from modal"
      >
        <ModalContent handleCloseModal={handleCloseModal} />
      </Modal>
    </div>
  );
};

const ModalContent = ({ handleCloseModal }) => {
  return (
    <div className="currentMarketPriceModal">
      <div className="currentMarketPriceModal__header details__header">
        Where do we get this value from?
      </div>
      <div className="currentMarketPriceModal__text">
        The market price* of this company’s share is determined by a voluntary,
        non-profit committee made up of current and ex-employees of that
        company. The price is determined to the best of the committee’s
        knowledge, and serves as an unofficial estimate of the market price.
        <br />
        <br />
        For more information on the team, do check out{' '}
        <a
          className="currentMarketPriceModal__text--link"
          href={LANDING_URL}
          rel="noopener noreferrer"
          target="_blank"
        >
          Our Team
        </a>{' '}
        page.
        <div className="currentMarketPriceModal__text--subtext">
          *If no value exists, that means that there is no current committee for
          that company.
        </div>
      </div>
      <button
        onClick={handleCloseModal}
        type="button"
        className="delete is-large currentMarketPriceModal__close"
        aria-label="close"
      />
    </div>
  );
};

export default CurrentMarketPrice;
