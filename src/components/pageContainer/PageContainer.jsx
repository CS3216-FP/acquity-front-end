import React from 'react';

import './PageContainer.scss';

const PageContainer = ({ children }) => {
  return (
    <div className="columns is-marginless is-mobile is-centered">
      <div className="is-container column is-two-thirds-desktop is-four-fifths-tablet is-four-fifths-mobile">
        <div className="content-container">{children}</div>
      </div>
    </div>
  );
};

export default PageContainer;
