import React, { useReducer, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Modal from 'react-modal';

import 'assets/scss/modal.scss';

import { useUser } from 'contexts/userContext';
import { isSeller, isBuyer } from 'utils/userUtils';
import { toSgdCurrency } from 'utils/moneyUtils';
import { LANDING_URL } from 'constants/urls';
import './CurrentMarketPrice.scss';
import CurrentMarketPriceGhost from './CurrentMarketPriceGhost';

const CurrentMarketPrice = () => {
  const user = useUser();
  const {
    currentSelectedBuySecurity,
    currentSelectedSellSecurity,
    securities
  } = useSelector(state => state.securities);

  const [state, setState] = useReducer((s, a) => ({ ...s, ...a }), {
    isModalOpen: false,
    currentMarketPrice: null
  });

  useEffect(() => {
    if (isSeller(user) && currentSelectedSellSecurity) {
      const currentMarketPrice = securities.find(
        x => x.id === currentSelectedSellSecurity.id
      ).marketPrice;
      setState({ currentMarketPrice });
    } else if (isBuyer(user) && currentSelectedBuySecurity) {
      const currentMarketPrice = securities.find(
        x => x.id === currentSelectedBuySecurity.id
      ).marketPrice;

      setState({ currentMarketPrice });
    }
  }, [
    currentSelectedBuySecurity,
    currentSelectedSellSecurity,
    securities,
    user
  ]);

  const handleOpenModalClick = () => {
    setState({ isModalOpen: true });
  };

  const handleCloseModal = () => {
    setState({ isModalOpen: false });
  };

  if (!currentSelectedBuySecurity) {
    return <CurrentMarketPriceGhost />;
  }

  return (
    <div className="currentMarketPrice">
      <div className="details__header">Unofficial market price</div>
      <div className="currentMarketPrice__price">
        <span className="currentMarketPrice__price__value">
          {state.currentMarketPrice ? (
            <span>{toSgdCurrency(state.currentMarketPrice)}</span>
          ) : (
            <span>
              SGD{' '}
              <span className="currentMarketPrice__price__value--empty">
                0.00
              </span>
            </span>
          )}
        </span>
        <span className="currentMarketPrice__price--label">/share</span>
      </div>
      <button
        type="button"
        onClick={handleOpenModalClick}
        className="modal__trigger as-non-button"
      >
        <span className="icon">
          <i className="fas fa-question-circle" />
        </span>
        <span className="modal__trigger--text">
          Where do we get this value from?
        </span>
      </button>

      <Modal
        className="modal__content"
        overlayClassName="modal__overlay"
        closeTimeoutMS={200}
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
      <div className="modal__header details__header">
        Where do we get this value from?
      </div>
      <div className="modal__text">
        The market price* of this company’s share is determined by a voluntary,
        non-profit committee made up of current and ex-employees of that
        company. The price is determined to the best of the committee’s
        knowledge, and serves as an unofficial estimate of the market price.
        <br />
        <br />
        For more information on the various companies&apos; committees, do check
        out our{' '}
        <a
          className="modal__text--link"
          href={`${LANDING_URL}/#team`}
          rel="noopener noreferrer"
          target="_blank"
        >
          Our Committees
        </a>{' '}
        page.
        <div className="modal__text--subtext">
          *If no value exists, that means that there is no current committee for
          that company.
        </div>
      </div>
      <button
        onClick={handleCloseModal}
        type="button"
        className="delete is-large modal__close"
        aria-label="close"
      />
    </div>
  );
};

export default CurrentMarketPrice;
