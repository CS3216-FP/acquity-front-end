import React, { useReducer } from 'react';
import { Redirect } from 'react-router-dom';
import PageContainer from 'components/pageContainer';

import PageHeader from 'components/pageHeader';
import { moneyFormatter } from 'utils/moneyUtils';

import './Confirmation.scss';

const Confirmation = ({ bid, handleBackClick, apiCall, type }) => {
  const [state, setState] = useReducer((s, a) => ({ ...s, ...a }), {
    isLoading: false,
    isSuccessfulRequest: false
  });

  const handleConfirmClick = () => {
    setState({ isLoading: true });
    apiCall()
      .then(_response => {
        setState({ isLoading: false, isSuccess: true });
      })
      .catch(() => setState({ isLoading: false }));
  };

  if (state.isSuccess) {
    return <Redirect to="/" />;
  }

  return (
    <PageContainer>
      <div className="bidPage page confirmation">
        <PageHeader
          headerText={`${type} Information`}
          handleBackClick={handleBackClick}
        />
        <div className="page__content columns is-mobile">
          <div className="column is-full-mobile is-four-fifths-tablet is-half-desktop">
            <div className="confirmation__details">
              <div className="confirmation__details__label">Company</div>
              <div className="confirmation__details__value">
                {bid.securityName}
              </div>
              <div className="confirmation__details__label">
                Number of shares
              </div>
              <div className="confirmation__details__value">
                {bid.numberOfShares}
              </div>
              <div className="confirmation__details__label">
                {type === 'bid'
                  ? 'Maximum price per share'
                  : 'Minimum price per share'}
              </div>
              <div className="confirmation__details__value">
                SGD {moneyFormatter(bid.price)}
              </div>
              <div className="confirmation__details__label">
                Estimated total
              </div>
              <div className="confirmation__estimate__amount confirmation__details__value">
                <span className="estimate__amount--currency">SGD</span>
                <span className="estimate__amount--amount">
                  {moneyFormatter(bid.price * bid.numberOfShares)}
                </span>
              </div>
            </div>
            <div className="confirmation__disclaimer">
              {/* TODO: Update copywriting of disclaimer */}
              Placing this {type} does not guarantee a match nor the final
              price. It is up the buyers&apos; and sellers&apos; mutual
              agreement after discussion.
            </div>
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
