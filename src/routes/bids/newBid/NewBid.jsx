import React, { useEffect, useReducer } from 'react';
import { Redirect } from 'react-router-dom';

import { isSeller } from 'utils/userUtils';
import { useUser } from 'contexts/userContext';
import PageContainer from 'components/pageContainer';
import PageHeader from 'components/pageHeader';
import ErrorMessage from 'components/errorMessage';
import ApiService from 'services/apiService';
import NewBidForm from './NewBidForm';
import Confirmation from '../proceedConfirmation';

import '../style.scss';

const NewBid = ({ apiEndpoint, type }) => {
  const user = useUser();
  const [state, setState] = useReducer((s, a) => ({ ...s, ...a }), {
    isLoading: true,
    isError: false,
    showConfirm: false,
    formData: null,
    securities: []
  });

  useEffect(() => {
    let didCancel = false;
    const fetchData = async () => {
      try {
        const response = await ApiService.get('security/');
        if (!didCancel) {
          setState({
            isLoading: false,
            securities: response.data
          });
        }
      } catch (error) {
        if (!didCancel) {
          setState({ isLoading: false, isError: true });
        }
      }
    };

    fetchData();

    return () => {
      didCancel = true;
    };
  }, []);

  if (type === 'offer' && !isSeller(user)) {
    return <Redirect to="/" />;
  }

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

  return (
    <PageContainer>
      <div className="bidPage page">
        <PageHeader headerText={`${type} Information`} />
        <div className="page__content columns is-mobile is-gapless">
          <div className="form-wrapper column is-full-mobile is-four-fifths-tablet is-half-desktop">
            {state.isError && <ErrorMessage />}
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

export default NewBid;
