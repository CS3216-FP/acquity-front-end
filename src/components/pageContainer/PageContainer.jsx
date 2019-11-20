import React from 'react';

import './PageContainer.scss';

const PageContainer = ({ children, dark, className = '' }) => {
  return (
    <div className={`columns is-marginless is-mobile is-centered ${className}`}>
      <div
        className={`is-container ${
          dark ? 'is-container--dark' : ''
        } column is-four-fifths`}
      >
        <div className="content-container">{children}</div>
      </div>
    </div>
  );
};

export default PageContainer;
