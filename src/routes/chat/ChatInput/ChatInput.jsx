import React from 'react';
import SendIcon from '../../../assets/images/send_icon.png';

import './ChatInput.scss';

const ChatInput = ({ fetchNewMessage, chatRoomId }) => {
  const [message, setMessage] = React.useState('');

  const updateMessage = event => {
    setMessage(event.target.value);
  };

  const sendMessage = event => {
    if (event.key === 'Enter') {
      event.preventDefault();
      fetchNewMessage({ chatRoomId, message });
      setMessage('');
    }
  };

  return (
    <div>
      <div className="columns is-marginless is-mobile">
        <div className="column is-11-mobile is-10">
          <div className="field">
            <div className="control">
              <input
                className="input is-info"
                type="text"
                placeholder="Write a message..."
                value={message}
                onChange={updateMessage}
                onKeyPress={sendMessage}
              />
            </div>
          </div>
        </div>
        <div className="column">
          <img
            src={SendIcon}
            alt="Send"
            width="30"
            className="chatinput__icon"
          />
        </div>
      </div>
    </div>
  );
};

export default ChatInput;
