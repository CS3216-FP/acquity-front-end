import React from 'react';
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';
import {
  ThemeProvider,
  Message,
  MessageGroup,
  MessageList,
  MessageMedia,
  MessageText
} from '@livechat/ui-kit';
import { useChatSize } from './ChatUtils';
import messageList from './dummy/messages';

const UserChatRoom = () => {
  const scrollHeight = useChatSize();

  return (
    <ThemeProvider>
      <SimpleBar style={{ height: scrollHeight - 280 }}>
        <MessageList>
          {messageList.map(messageGroup => (
            <MessageGroup avatar={messageGroup.avatar}>
              {messageGroup.messages.map(message => (
                <Message
                  authorName={messageGroup.authorName}
                  date={message.date}
                  isOwn={messageGroup.isOwn}
                >
                  {message.messageMedia === {} ? null : (
                    <MessageMedia>
                      <img
                        src={message.messageMedia.imgSrc}
                        alt={message.messageMedia.alt}
                      />
                    </MessageMedia>
                  )}
                  {message.messageText === {} ? null : (
                    <MessageText>{message.messageText.text}</MessageText>
                  )}
                </Message>
              ))}
            </MessageGroup>
          ))}
        </MessageList>
      </SimpleBar>
    </ThemeProvider>
  );
};

export default UserChatRoom;
