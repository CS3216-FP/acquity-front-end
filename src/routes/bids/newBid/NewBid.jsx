import React, { useEffect, useReducer } from 'react';
import { withRouter } from 'react-router-dom';
import PageContainer from 'components/pageContainer';
import ApiService from 'services/apiService';
import NewBidForm from './NewBidForm';

import '../style.scss';
import Confirmation from '../confirmation';

const NewBid = ({ history, apiEndpoint, type }) => {
  const [state, setState] = useReducer((s, a) => ({ ...s, ...a }), {
    isLoading: true,
    hasError: false,
    showConfirm: false,
    formData: null,
    securities: []
  });

  useEffect(() => {
    ApiService.get('security/')
      .then(response => {
        setState({
          isLoading: false,
          securities: response.data
        });
      })
      .catch(() => {
        setState({ isLoading: false, hasError: true });
      });
  }, []);

  if (state.showConfirm) {
    const apiCall = () =>
      ApiService.post(apiEndpoint, {
        numberOfShares: parseInt(state.formData.numberOfShares, 0),
        price: parseFloat(state.formData.price),
        securityId: state.formData.securityId
      });
    return (
      <Confirmation
        bid={state.formData}
        type={type}
        apiCall={apiCall}
        handleBackClick={() => setState({ showConfirm: false })}
      />
    );
  }

  if (state.hasError) {
    return <div>ERRORRRR</div>;
  }

  return (
    <PageContainer>
      <div className="bidPage page">
        <div className="page__header columns is-mobile">
          <div className="column is-1">
            <button
              onClick={() => history.goBack()}
              className="button button--cta button--nav--circle hvr-grow"
              type="button"
            >
              <i className="fas fa-arrow-left" />
            </button>
          </div>
          <span className="bidPage__header__text column">
            {type} Information
          </span>
          <div className="column is-1" />
        </div>
        <div className="page__content columns is-mobile">
          <div className="form-wrapper column is-full-mobile is-four-fifths-tablet is-half-desktop">
            <NewBidForm
              isLoading={state.isLoading}
              type={type}
              securities={state.securities}
              formData={state.formData}
              onSubmit={data => {
                setState({ formData: data, showConfirm: true });
              }}
            />
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

export default withRouter(NewBid);
