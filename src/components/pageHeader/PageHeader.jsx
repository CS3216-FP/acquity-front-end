import React from 'react';
import { withRouter } from 'react-router-dom';

import './PageHeader.scss';

const PageHeader = ({
  hasBackButton = true,
  headerText,
  history,
  handleBackClick
}) => {
  return (
    <div className="page__header columns is-mobile">
      <div className="column is-1">
        {hasBackButton && (
          <button
            onClick={handleBackClick || (() => history.goBack())}
            className="button button--cta button--nav--circle hvr-grow"
            type="button"
          >
            <i className="fas fa-arrow-left" />
          </button>
        )}
      </div>
      <span className="page__header__text column">{headerText}</span>
      <div className="column is-1" />
    </div>
  );
};

export default withRouter(PageHeader);
