import React from 'react';

const NotifyDetails = () => {
  return (
    <div className="countdownDetails notifyDetails">
      <div className="countdownDetails__header">
        The round has not opened yet.
      </div>
      <div className="countdownDetails__text">
        The round will open when enough sellers have placed their asks. You may
        still place your asks or bids. <br />
        We will notify you when the next round begins.
      </div>
    </div>
  );
};

export default NotifyDetails;
