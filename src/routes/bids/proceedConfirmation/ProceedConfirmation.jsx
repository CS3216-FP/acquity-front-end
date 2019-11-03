import React, { useReducer } from 'react';
import { Redirect } from 'react-router-dom';

import PageContainer from 'components/pageContainer';
import ErrorMessage from 'components/errorMessage';
import PageHeader from 'components/pageHeader';
import { moneyFormatter, toSgdCurrency } from 'utils/moneyUtils';

import OrderDisclaimer from '../orderDisclaimer';
import './ProceedConfirmation.scss';

const Confirmation = ({ bid, handleBackClick, apiCall, type }) => {
  const [state, setState] = useReducer((s, a) => ({ ...s, ...a }), {
    isLoading: false,
    isSuccess: false,
    isError: false
  });

  const handleConfirmClick = () => {
    setState({ isLoading: true, isError: false });
    apiCall()
      .then(_response => {
        setState({ isLoading: false, isSuccess: true });
      })
      .catch(() => setState({ isLoading: false, isError: true }));
  };

  if (state.isSuccess) {
    return <Redirect to="/" />;
  }

  return (
    <PageContainer>
      <div className="bidPage page proceedConfirmation">
        <PageHeader
          headerText={`${type} Information`}
          handleBackClick={handleBackClick}
        />
        <div className="page__content columns is-mobile is-gapless">
          <div className="column is-full-mobile is-four-fifths-tablet is-half-desktop">
            <div className="confirmation__details">
              {state.isError && (
                <ErrorMessage message="Something went wrong. Have you reached your bid or offer limit?" />
              )}
              <div className="confirmation__details__block">
                <div className="confirmation__details__label">Company</div>
                <div className="confirmation__details__value">
                  {bid.securityName}
                </div>
              </div>
              <div className="confirmation__details__block">
                <div className="confirmation__details__label">
                  Number of shares
                </div>
                <div className="confirmation__details__value">
                  {Number(bid.numberOfShares).toLocaleString()}
                </div>
              </div>
              <div className="confirmation__details__block">
                <div className="confirmation__details__label">
                  {type === 'bid'
                    ? 'Maximum price per share'
                    : 'Minimum price per share'}
                </div>
                <div className="confirmation__details__value">
                  {toSgdCurrency(bid.price)}
                </div>
              </div>
              <div className="confirmation__details__block">
                <div className="confirmation__details__label">
                  Estimated total
                </div>
                <div className="confirmation__estimate__amount">
                  <span className="estimate__amount--currency">SGD </span>
                  <span
                    className="estimate__amount--amount"
                    title={toSgdCurrency(bid.price * bid.numberOfShares)}
                  >
                    {moneyFormatter(bid.price * bid.numberOfShares)}
                  </span>
                </div>
              </div>
            </div>
            <OrderDisclaimer type={type} />
            <div className="confirmation__action">
              <button
                onClick={handleConfirmClick}
                type="button"
                className={`button--cta button hvr-grow ${
                  state.isLoading ? 'is-loading' : ''
                }`}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

export default Confirmation;
