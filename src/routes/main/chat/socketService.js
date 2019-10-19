import io from 'socket.io-client';
import isEmpty from 'lodash/isEmpty';
import tokenUtils from '../../../utils/tokenUtils';
import store from '../../../app/store';

const Socket = {
  socket: null,
  connect: null,
  load: null
};

const connect = () => {
  const hasAuthenticated = !isEmpty(tokenUtils.getToken());
  if (hasAuthenticated) {
    Socket.socket = io.connect('http://localhost:8000/chat', {
      transportOptions: {
        polling: {
          extraHeaders: {
            token: tokenUtils.getToken()
          }
        }
      }
    });
  }
};

const load = () => {
  Socket.socket.on('load', payload => {
    store.dispatch({
      type: 'SOCKET_MESSAGE_RECEIVED',
      payload
    });
  });
};

const initialize = () => {
  Socket.connect = connect();
  Socket.load = load();
};

export default {
  initialize,
  load
};
