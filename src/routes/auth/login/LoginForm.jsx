import React, { useState } from 'react';
import AuthService from 'services/authService';
import TypeSelector from './TypeSelector';

import './LoginForm.scss';
import LinkedInModal from './LinkedInModal/LinkedInModal';

const LoginForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLogin = async () => {
    setIsLoading(true);
    const response = await AuthService.getLinkedInRedirect();
    window.location.replace(response.data);
  };

  const handleOpenModalClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="login">
        <div className="login__type">
          <span className="login__type--text">I am a:</span>
          <TypeSelector />
        </div>
        <div className="login__action">
          <button
            type="button"
            onClick={handleLogin}
            disabled={isLoading}
            className={`button button--cta hvr-grow login__button ${
              isLoading ? 'is-loading' : ''
            }`}
          >
            <span className="icon">
              <i className="fab fa-linkedin fa-lg" />
            </span>
            Login Now with LinkedIn
          </button>
          <button
            onClick={handleOpenModalClick}
            type="button"
            className="modal__trigger as-non-button"
          >
            <span className="icon">
              <i className="fas fa-question-circle" />
            </span>
            <span className="modal__trigger--text">
              Why do we need your LinkedIn?
            </span>
          </button>
        </div>
      </div>
      <LinkedInModal isOpen={isModalOpen} handleClose={handleCloseModal} />
    </>
  );
};

export default LoginForm;
