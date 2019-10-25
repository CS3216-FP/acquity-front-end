import io from 'socket.io-client';

const Socket = {
  socket: null,
  connect: null,
  load: null
};

export const socketConnect = () => {
  Socket.socket = io.connect(`${process.env.REACT_APP_BACKEND_API}chat`);
};

export const socketDisconnect = () => {
  Socket.socket.disconnect();
};

export default Socket;
