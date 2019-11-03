import React from 'react';

import './PageContainer.scss';

const PageContainer = ({ children, dark }) => {
  return (
    <div className="columns is-marginless is-mobile is-centered">
      <div
        className={`is-container ${
          dark ? 'is-container--dark' : ''
        } column is-four-fifths-desktop is-four-fifths-tablet is-four-fifths-mobile is-two-thirds-fullhd`}
      >
        <div className="content-container">{children}</div>
      </div>
    </div>
  );
};

export default PageContainer;
