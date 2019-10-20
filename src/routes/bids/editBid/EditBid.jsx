/* eslint-disable no-console */
import React, { useEffect, useReducer } from 'react';

import ApiService from 'services/apiService';
import PageContainer from 'components/pageContainer';
import PageHeader from 'components/pageHeader';
import EditBidForm from './EditBidForm';
import Confirmation from '../confirmation';

import './EditBid.scss';
import '../style.scss';

const EditBid = ({ match, location, apiEndpoint, type }) => {
  const [state, setState] = useReducer((s, a) => ({ ...s, ...a }), {
    isLoading: true,
    hasError: false,
    showConfirm: false,
    formData: null
  });
  const itemId = match.params.id;
  const { item } = location;

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    // Did not come from home page, came from URL
    if (!item) {
      ApiService.get(`${apiEndpoint}/${itemId}`)
        .then(response => {
          setState({ formData: response.data, isLoading: false });
        })
        .catch(() => {
          setState({ isLoading: false, hasError: true });
        });
    } else {
      setState({ formData: item, isLoading: false });
    }
    return () => {};
  }, [itemId, item, apiEndpoint]);

  if (state.showConfirm) {
    const apiCall = () =>
      ApiService.patch(`${apiEndpoint}/${itemId}`, {
        newNumberOfShares: parseInt(state.formData.numberOfShares, 0),
        newPrice: parseFloat(state.formData.price)
      });
    return (
      <Confirmation
        bid={state.formData}
        apiCall={apiCall}
        type={type}
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
        <PageHeader headerText={`Edit ${type}`} />
        <div className="page__content columns is-mobile">
          <div className="form-wrapper column is-full-mobile is-four-fifths-tablet is-half-desktop">
            {state.isLoading ? (
              <div>Loading</div>
            ) : (
              <EditBidForm
                formData={state.formData}
                onSubmit={data => {
                  setState({ formData: data, showConfirm: true });
                }}
                type={type}
                onDelete={data => console.log('deleting', data)}
              />
            )}
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

export default EditBid;
