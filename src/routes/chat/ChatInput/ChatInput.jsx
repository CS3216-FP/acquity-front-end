import React from 'react';
import { useSocket } from 'contexts/socketContext';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import SocketRequestService from 'services/SocketService/socketRequestService';

import './ChatInput.scss';

const ChatInput = () => {
  const [message, setMessage] = React.useState('');
  const { chatRoomId } = useParams();
  const userType = useSelector(state => state.misc.userType);
  const socket = useSocket();

  const handleChange = event => {
    setMessage(event.target.value);
  };

  const sendMessage = () => {
    if (!message) return;
    SocketRequestService.addNewMessage({
      chatRoomId,
      message,
      userType,
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
          <div className="form__field field">
            <div className="control">
              <input
                className="input is-info"
                type="text"
                placeholder="Write a message..."
                value={message}
                onChange={handleChange}
                onKeyPress={handleKeyPress}
              />
            </div>
          </div>
        </div>
        <div className="chatInput__button--enter column is-narrow">
          <button
            onClick={sendMessage}
            type="submit"
            className="icon is-medium"
          >
            <i className="fa fa-level-down-alt fa-rotate-90 fa-2x" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatInput;
