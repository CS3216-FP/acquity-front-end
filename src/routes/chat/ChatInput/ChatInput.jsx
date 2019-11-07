import React from 'react';

import './ChatInput.scss';

const ChatInput = () => {
  const [value, setMessage] = React.useState('');

  const handleChange = event => {
    setMessage(event.target.value);
  };

  const sendMessage = () => {
    if (!value) return;
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
                value={value}
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
