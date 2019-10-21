import React from 'react';
import SendIcon from '../../assets/images/send_icon.png';

const ChatList = () => {
  return (
    <div>
      <div className="columns">
        <div className="column is-four-fifths">
          <div className="field">
            <div className="control">
              <input
                className="input is-info"
                type="text"
                placeholder="Info input"
              />
            </div>
          </div>
        </div>
        <div className="column">
          <img src={SendIcon} alt="Send" width="30" />
        </div>
      </div>
    </div>
  );
};

export default ChatList;
