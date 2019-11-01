import React, { useEffect, useState } from 'react';

import { useUser } from 'contexts/userContext';
import { isUnapprovedBuyer } from 'utils/userUtils';
import AccountApprovalModal from 'components/modal/AccountApprovalModal';

import './OrderDisclaimer.scss';

const OrderDisclaimer = ({ type }) => {
  const user = useUser();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [disclaimerText, setDisclaimerText] = useState('');

  useEffect(() => {
    let disclaimer;
    if (type === 'bid') {
      disclaimer = `You can only have one bid per company for each round. ${
        isUnapprovedBuyer(user)
          ? '\nThis bid will only be confirmed once your account has been approved.'
          : ''
      }`;
    } else if (type === 'offer') {
      disclaimer = `You can only post up to two offers for each round.`;
    }
    setDisclaimerText(disclaimer);
  }, [type, user]);

  const handleOpenModalClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="confirmation__disclaimer">
        <span className="confirmation__disclaimer--text">{disclaimerText}</span>
        {isUnapprovedBuyer(user) && (
          <button
            onClick={handleOpenModalClick}
            type="button"
            className="modal__trigger as-non-button"
          >
            <span className="icon">
              <i className="fas fa-question-circle" />
            </span>
            <span className="modal__trigger--text">
              Why does my account need to be approved?
            </span>
          </button>
        )}
      </div>
      <AccountApprovalModal
        isOpen={isModalOpen}
        handleClose={handleCloseModal}
      />
    </>
  );
};

export default OrderDisclaimer;
