/* eslint-disable no-console */
import React, { useEffect, useReducer } from 'react';

import ApiService from 'services/apiService';
import PageContainer from 'components/pageContainer';
import PageHeader from 'components/pageHeader';
import EditBidForm from './EditBidForm';
import ProceedConfirmation from '../proceedConfirmation';

import './EditBid.scss';
import '../style.scss';
import DeleteConfirmation from '../deleteConfirmation/DeleteConfirmation';

const EditBid = ({ match, location, apiEndpoint, type }) => {
  const [state, setState] = useReducer((s, a) => ({ ...s, ...a }), {
    isLoading: true,
    hasError: false,
    showConfirm: false,
    showDelete: false,
    // For deleting of bid, should show the initial data instead of modified data
    initialData: null,
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
          setState({
            initialData: response.data,
            formData: response.data,
            isLoading: false
          });
        })
        .catch(() => {
          setState({ isLoading: false, hasError: true });
        });
    } else {
      setState({ initialData: item, formData: item, isLoading: false });
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
      <ProceedConfirmation
        bid={state.formData}
        apiCall={apiCall}
        type={type}
        handleBackClick={() => setState({ showConfirm: false })}
      />
    );
  }

  if (state.showDelete) {
    const apiCall = () => ApiService.delete(`${apiEndpoint}/${itemId}`);
    return (
      <DeleteConfirmation
        bid={state.initialData}
        apiCall={apiCall}
        type={type}
        handleBackClick={() => setState({ showDelete: false })}
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
                onDelete={() => setState({ showDelete: true })}
              />
            )}
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

export default EditBid;
