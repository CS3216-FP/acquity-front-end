import React from 'react';

import './SuccessfulMatchContainer.scss';
import RevealIdentityDisclaimer from './RevealIdentityDisclaimer';

const SuccessfulMatchContainer = () => {
  return (
    <div className="successfulMatch">
      <div className="successfulMatch__header">
        Congratulations on the successful match!
      </div>
      <div className="successfulMatch__content">
        <div className="successfulMatch__content--text">
          To continue this transaction offline, you will need to:
        </div>
        <button className="successfulMatch__button" type="button">
          Reveal My Identity
        </button>
        <RevealIdentityDisclaimer />
      </div>
    </div>
  );
};

export default SuccessfulMatchContainer;
