import React, { useEffect, useState } from 'react';
import { useAuth } from 'contexts/authContext';
import camelcaseKeys from 'camelcase-keys';

const SocialAuth = ({ socket }) => {
  const { saveLinkedInToken } = useAuth();
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  let popUpWindow = window;

  const updatedBuyerPrivileges = () => {
    socket.on('provider', async val => {
      popUpWindow.close();
      setIsButtonDisabled(false);
      await saveLinkedInToken(camelcaseKeys(val));
    });
  };

  const checkPopup = () => {
    const check = setInterval(() => {
      if (popUpWindow && popUpWindow.closed) {
        clearInterval(check);
        setIsButtonDisabled(false);
      }
    }, 1000);
  };

  useEffect(() => {
    updatedBuyerPrivileges();
  });

  const openPopup = () => {
    const width = 500;
    const height = 600;
    const left = window.innerWidth / 2 - width / 2;
    const top = window.innerHeight / 2 - height / 2;
    // Substring to obtain the socket id fir current socket session.
    const url = `${
      process.env.REACT_APP_BACKEND_API
    }linkedin/auth?socketId=${socket.id.substring(5)}`;

    return window.open(
      url,
      '',
      `toolbar=no, location=no, directories=no, status=no, menubar=no, 
      scrollbars=no, resizable=no, copyhistory=no, width=${width}, 
      height=${height}, top=${top}, left=${left}`
    );
  };

  const activateBuyerPrivileges = () => {
    setIsButtonDisabled(true);
    popUpWindow = openPopup();
    checkPopup();
    // popUpWindow.close()
  };

  return (
    <button
      onClick={() => activateBuyerPrivileges()}
      className="button is-info"
      type="button"
      disabled={isButtonDisabled}
    >
      Activate Buyer Privileges
    </button>
  );
};

export default SocialAuth;
