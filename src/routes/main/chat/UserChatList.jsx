import React from 'react';
import { connect } from 'react-redux';

import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';
import {
  ThemeProvider,
  Avatar,
  Column,
  Title,
  Subtitle,
  ChatList,
  ChatListItem,
  Row
} from '@livechat/ui-kit';
import { useChatSize } from './ChatUtils';
import Socket from './socketService';

const UserChatList = ({ chatList }) => {
  const scrollHeight = useChatSize();

  return (
    <ThemeProvider>
      <SimpleBar style={{ maxHeight: scrollHeight - 250 }}>
        <ChatList style={{ maxWidth: '100%', float: 'left' }}>
          {chatList.map(user => (
            <ChatListItem>
              {user.avatar === null ? (
                <Avatar letter={user.letter} />
              ) : (
                <Avatar imgUrl={user.avatar} />
              )}
              {/* eslint-disable-next-line react/button-has-type */}
              <button
                onClick={() =>
                  Socket.setChatRoom({ chatRoomId: user.chat_room_id })
                }
              >
                Button
              </button>
              <Column fill>
                <Row justify>
                  <Title ellipsis>{user.username}</Title>
                  <Subtitle nowrap>{user.date}</Subtitle>
                </Row>
                <Subtitle ellipsis>{user.text}</Subtitle>
              </Column>
            </ChatListItem>
          ))}
        </ChatList>
      </SimpleBar>
    </ThemeProvider>
  );
};

function matchStateToProps(state) {
  return {
    chatList: state.chat.chatList
    // data: state.faq.data.groupedFaqs,
    // searchData: state.faq.data.ungroupedFaqs,
  };
}

// eslint-disable-next-line no-unused-vars
function matchDispatchToProps(dispatch) {
  return {
    // onMount: () => dispatch(FAQ_ONMOUNT_REQUEST()),
  };
}

export default connect(
  matchStateToProps,
  matchDispatchToProps()
)(UserChatList);
