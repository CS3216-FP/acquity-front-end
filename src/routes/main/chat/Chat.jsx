import React, { useState, useEffect } from 'react';
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import {
  ThemeProvider,
  Avatar,
  Column,
  Title,
  Subtitle,
  ChatList,
  ChatListItem,
  Row,
  Message,
  MessageGroup,
  MessageList,
  MessageButtons,
  MessageButton,
  MessageTitle,
  MessageMedia,
  MessageText,
  TextComposer,
  TextInput,
  AddIcon,
  IconButton,
  SendButton
} from '@livechat/ui-kit';
import './Chat.scss';

const useMouseMove = () => {
  const [coords, setCoords] = useState(window.innerHeight);

  useEffect(() => {
    const handler = () => {
      setCoords(window.innerHeight);
    };
    window.addEventListener('resize', handler);
    return () => {
      window.removeEventListener('resize', handler);
    };
  }, []);

  return coords;
};

const Chat = () => {
  const x = useMouseMove();

  return (
    <ThemeProvider>
      <div>{x}</div>
      <Grid container>
        <Hidden xsDown>
          <Grid item sm={4}>
            <SimpleBar style={{ maxHeight: document.body.scrollHeight - 250 }}>
              <ChatList style={{ maxWidth: '100%', float: 'left' }}>
                <ChatListItem>
                  <Avatar letter="K" />
                  <Column fill>
                    <Row justify>
                      <Title ellipsis>Konrad</Title>
                      <Subtitle nowrap>14:31 PM</Subtitle>
                    </Row>
                    <Subtitle ellipsis>
                      Hello, how can I help you? We have a lot to talk about
                    </Subtitle>
                  </Column>
                </ChatListItem>
                <ChatListItem>
                  <Avatar letter="K" />
                  <Column fill>
                    <Row justify>
                      <Title ellipsis>Konrad</Title>
                      <Subtitle nowrap>14:31 PM</Subtitle>
                    </Row>
                    <Subtitle ellipsis>
                      Hello, how can I help you? We have a lot to talk about
                    </Subtitle>
                  </Column>
                </ChatListItem>
                <ChatListItem>
                  <Avatar letter="K" />
                  <Column fill>
                    <Row justify>
                      <Title ellipsis>Konrad</Title>
                      <Subtitle nowrap>14:31 PM</Subtitle>
                    </Row>
                    <Subtitle ellipsis>
                      Hello, how can I help you? We have a lot to talk about
                    </Subtitle>
                  </Column>
                </ChatListItem>
                <ChatListItem>
                  <Avatar letter="K" />
                  <Column fill>
                    <Row justify>
                      <Title ellipsis>Konrad</Title>
                      <Subtitle nowrap>14:31 PM</Subtitle>
                    </Row>
                    <Subtitle ellipsis>
                      Hello, how can I help you? We have a lot to talk about
                    </Subtitle>
                  </Column>
                </ChatListItem>
                <ChatListItem>
                  <Avatar letter="K" />
                  <Column fill>
                    <Row justify>
                      <Title ellipsis>Konrad</Title>
                      <Subtitle nowrap>14:31 PM</Subtitle>
                    </Row>
                    <Subtitle ellipsis>
                      Hello, how can I help you? We have a lot to talk about
                    </Subtitle>
                  </Column>
                </ChatListItem>
                <ChatListItem active>
                  <Avatar letter="J" />
                  <Column fill>
                    <Row justify>
                      <Title ellipsis>Andrew</Title>
                      <Subtitle nowrap>14:31 PM</Subtitle>
                    </Row>
                    <Subtitle ellipsis>
                      actually I just emailed you back
                    </Subtitle>
                  </Column>
                </ChatListItem>
                <ChatListItem>
                  <Avatar imgUrl="https://livechat.s3.amazonaws.com/default/avatars/male_8.jpg" />
                  <Column fill>
                    <Row justify>
                      <Title ellipsis>Michael</Title>
                      <Subtitle nowrap>14:31 PM</Subtitle>
                    </Row>
                    <Subtitle ellipsis>
                      Ok, thanks for the details, I&apos;ll get back to you
                      tomorrow.
                    </Subtitle>
                  </Column>
                </ChatListItem>
              </ChatList>
            </SimpleBar>
          </Grid>
        </Hidden>
        <Grid item xs={12} sm={8}>
          <div style={{ width: '100%', float: 'right' }} className="chatRoom">
            <SimpleBar style={{ maxHeight: document.body.scrollHeight - 280 }}>
              <MessageList active>
                <MessageGroup
                  avatar="https://livechat.s3.amazonaws.com/default/avatars/male_8.jpg"
                  onlyFirstWithMeta
                >
                  <Message authorName="Jon Smith" date="21:37" showMetaOnClick>
                    <MessageMedia>
                      <img
                        src="https://static.staging.livechatinc.com/1520/P10B78E30V/dfd1830ebb68b4eefe6432d7ac2be2be/Cat-BusinessSidekick_Wallpapers.png"
                        alt="User Name"
                      />
                    </MessageMedia>
                  </Message>
                  <Message authorName="Jon Smith" date="21:37">
                    <MessageTitle title="Message title" subtitle="24h" />
                    <MessageMedia>
                      <img
                        src="https://static.staging.livechatinc.com/1520/P10B78E30V/dfd1830ebb68b4eefe6432d7ac2be2be/Cat-BusinessSidekick_Wallpapers.png"
                        alt="Message Title"
                      />
                    </MessageMedia>
                    <MessageText>
                      The fastest way to help your customers - start chatting
                      with visitors
                    </MessageText>
                    <MessageButtons>
                      <MessageButton label="View more" primary />
                      <MessageButton label="Cancel" />
                    </MessageButtons>
                    <MessageText>
                      The fastest way to help your customers - start chatting
                      with visitors who need your help using a free 30-day
                      trial.
                    </MessageText>
                    <MessageButtons>
                      <MessageButton label="View more" primary />
                      <MessageButton label="Cancel" />
                    </MessageButtons>
                  </Message>
                  <Message date="21:38" authorName="Jon Smith">
                    <MessageText>
                      Hi! I would like to buy those shoes
                    </MessageText>
                  </Message>
                </MessageGroup>
                <MessageGroup onlyFirstWithMeta>
                  <Message date="21:38" isOwn authorName="Visitor">
                    <MessageText>
                      I love them
                      sooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo
                      much!
                    </MessageText>
                  </Message>
                  <Message date="21:38" isOwn authorName="Visitor">
                    <MessageText>This helps me a lot</MessageText>
                  </Message>
                </MessageGroup>
                <MessageGroup
                  avatar="https://livechat.s3.amazonaws.com/default/avatars/male_8.jpg"
                  onlyFirstWithMeta
                >
                  <Message authorName="Jon Smith" date="21:37">
                    <MessageText>No problem!</MessageText>
                  </Message>
                  <Message
                    authorName="Jon Smith"
                    imageUrl="https://static.staging.livechatinc.com/1520/P10B78E30V/dfd1830ebb68b4eefe6432d7ac2be2be/Cat-BusinessSidekick_Wallpapers.png"
                    date="21:39"
                  >
                    <MessageText>
                      The fastest way to help your customers - start chatting
                      with visitors who need your help using a free 30-day
                      trial.
                    </MessageText>
                  </Message>
                  <Message authorName="Jon Smith" date="21:39">
                    <MessageMedia>
                      <img
                        src="https://static.staging.livechatinc.com/1520/P10B78E30V/dfd1830ebb68b4eefe6432d7ac2be2be/Cat-BusinessSidekick_Wallpapers.png"
                        alt="Author Name"
                      />
                    </MessageMedia>
                  </Message>
                </MessageGroup>
              </MessageList>
            </SimpleBar>
            <TextComposer defaultValue="Hello, can you help me?">
              <Row align="center">
                <IconButton fit>
                  <AddIcon />
                </IconButton>
                <TextInput fill />
                <SendButton fit />
              </Row>
            </TextComposer>
          </div>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default Chat;
