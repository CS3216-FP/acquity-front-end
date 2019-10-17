import React from 'react';
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
import users from './dummy/users';

const UserChatList = () => {
  const scrollHeight = useChatSize();

  return (
    <ThemeProvider>
      <SimpleBar style={{ maxHeight: scrollHeight - 250 }}>
        <ChatList style={{ maxWidth: '100%', float: 'left' }}>
          {users.map(user => (
            <ChatListItem>
              {user.avatar === null ? (
                <Avatar letter={user.letter} />
              ) : (
                <Avatar imgUrl={user.avatar} />
              )}
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

export default UserChatList;
