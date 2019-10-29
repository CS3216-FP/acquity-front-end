import React, { useReducer } from 'react';
import { Redirect } from 'react-router-dom';
import PageContainer from 'components/pageContainer';

import PageHeader from 'components/pageHeader';
import OrderItem from 'components/orderItem';

import './DeleteConfirmation.scss';

const DeleteConfirmation = ({ bid, handleBackClick, apiCall, type }) => {
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
      <div className="bidPage page deleteConfirmation">
        <PageHeader
          headerText="Confirm deletion"
          handleBackClick={handleBackClick}
        />
        <div className="page__content columns is-mobile">
          <div className="deleteConfirmation__subheader">
            Are you sure you wish to delete this {bid.securityName} {type}?
          </div>
          <OrderItem item={bid} type={type} />
          <div className="confirmation__action">
            <button
              onClick={handleConfirmClick}
              type="button"
              className={`button--danger button hvr-grow ${
                state.isLoading ? 'is-loading' : ''
              }`}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

export default DeleteConfirmation;
