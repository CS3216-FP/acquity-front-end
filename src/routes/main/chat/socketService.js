import io from 'socket.io-client';
import tokenUtils from '../../../utils/tokenUtils';
import store from '../../../app/store';

const Socket = {
  socket: null,
  connect: null,
  load: null
};

const connect = () => {
  Socket.socket = io.connect('http://localhost:8000/chat');
};

const setChatList = () => {
  Socket.socket.emit('set_chat_list', {
    token: tokenUtils.getToken()
  });
};

const getChatList = () => {
  Socket.socket.on('get_chat_list', payload => {
    store.dispatch({
      type: 'get_chat_list',
      payload
    });
  });
};

const setChatRoom = ({ chatRoomId }) => {
  Socket.socket.emit('set_chat_room', {
    chat_room_id: chatRoomId,
    token: tokenUtils.getToken()
  });
};

const getChatRoom = () => {
  Socket.socket.on('get_chat_room', payload => {
    store.dispatch({
      type: 'get_chat_room',
      payload
    });
  });
};

const sendNewMessage = ({ text, chatRoomId }) => {
  Socket.socket.emit('send_new_message', {
    text,
    img: null,
    chat_room_id: chatRoomId,
    token: tokenUtils.getToken()
  });
};

const getNewMessage = () => {
  Socket.socket.on('get_new_message', payload => {
    store.dispatch({
      type: 'get_new_message',
      payload
    });
  });
};

const setChat = ({ chatRoomId }) => {
  store.dispatch({
    type: 'set_chat_room_id',
    payload: {
      chatRoomId
    }
  });
};

const initialize = () => {
  Socket.connect = connect();
  Socket.getChatList = getChatList();
  Socket.getChatRoom = getChatRoom();
  Socket.getNewMessage = getNewMessage();
};

export default {
  initialize,
  setChatRoom,
  sendNewMessage,
  setChat,
  setChatList
};
