import React from 'react';

const Toast = ({ toast, closeToast }) => {
  return (
    <div className={`notification ${toast.className}`}>
      <button
        onClick={closeToast}
        type="button"
        aria-label="close notification"
        className="delete"
      />
      {toast.message}
    </div>
  );
};

export default Toast;
