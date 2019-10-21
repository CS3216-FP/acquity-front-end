import io from 'socket.io-client';

const Socket = {
  socket: null,
  connect: null,
  load: null
};

const connect = () => {
  Socket.socket = io.connect(`${process.env.REACT_APP_BACKEND_API}chat`);
};

connect();

export default Socket;
