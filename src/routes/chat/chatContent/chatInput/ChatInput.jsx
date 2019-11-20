import React from 'react';
import { useSocket } from 'contexts/socketContext';
import { useParams } from 'react-router-dom';

import SocketRequestService from 'services/SocketService/socketRequestService';

import './ChatInput.scss';

const ChatInput = ({ isDisbanded }) => {
  const [message, setMessage] = React.useState('');
  const { chatRoomId } = useParams();
  const socket = useSocket();

  const handleChange = event => {
    setMessage(event.target.value);
  };

  const sendMessage = () => {
    if (!message) return;
    SocketRequestService.addNewMessage({
      chatRoomId,
      message,
      socket
    });
    setMessage('');
  };

  const handleKeyPress = event => {
    if (event.key === 'Enter') {
      event.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="chatInput">
      <div className="columns is-marginless is-mobile is-gapless">
        <div className="column">
          <div className="form__field field has-addons">
            <div className="control is-expanded">
              <input
                disabled={isDisbanded}
                className="input"
                type="text"
                placeholder={`${
                  isDisbanded ? 'Chat has been disbanded' : 'Type a message...'
                }`}
                value={message}
                onChange={handleChange}
                onKeyPress={handleKeyPress}
              />
            </div>
            {message && (
              <div className="control chatInput__sendButton">
                <button
                  className="button button--cta no-shadow"
                  onClick={sendMessage}
                  type="submit"
                >
                  Send
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInput;
