import React, { useEffect, useState } from 'react';

const SocialAuth = ({ socket }) => {
  const [disabled, disableButton] = useState(false);
  let pop = window;

  const updatedBuyerPrivileges = () => {
    socket.on('provider', val => {
      // TODO: Redirect to home page upon successful authentication with Linkedin
      // eslint-disable-next-line no-console
      console.log(val);
      pop.close();
      disableButton(false);
    });
  };

  const checkPopup = () => {
    const check = setInterval(() => {
      if (!pop || pop.closed || pop.closed === undefined) {
        clearInterval(check);
        disableButton(false);
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
    disableButton(true);
    checkPopup();
    pop = openPopup();
  };

  return (
    <button
      onClick={() => activateBuyerPrivileges()}
      className="button is-info"
      type="button"
      disabled={disabled}
    >
      Activate Buyer Privileges
    </button>
  );
};

export default SocialAuth;
