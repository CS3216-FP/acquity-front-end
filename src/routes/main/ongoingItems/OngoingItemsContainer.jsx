import React, { useEffect, useReducer } from 'react';
import { Link } from 'react-router-dom';

import ApiService from 'services/apiService';
import Items from './Items';

import './OngoingItemsContainer.scss';

const OngoingItemsContainer = ({ type, apiEndpoint }) => {
  const [state, setState] = useReducer((s, a) => ({ ...s, ...a }), {
    isLoading: true,
    ongoingItems: []
  });

  useEffect(() => {
    ApiService.get(apiEndpoint).then(res => {
      const ongoingItems = res.data;
      ongoingItems.sort((a, b) => b.updatedAt - a.updatedAt);
      setState({ ongoingItems, isLoading: false });
    });
  }, [type, apiEndpoint]);

  return (
    <div className="info">
      <div className="info__header">Ongoing {type}</div>
      <div className="info__content">
        <Items
          type={type}
          loading={state.isLoading}
          ongoingItems={state.ongoingItems}
        />
        <Link to={`${type}/new`}>
          <button
            type="button"
            className="button button--cta hvr-grow info__button"
          >
            Create New {type}
          </button>
        </Link>
      </div>
    </div>
  );
};

export default OngoingItemsContainer;
