import io from 'socket.io-client';

const socket = io.connect('http://localhost:8000');

export const join = ({ room }) => {
  socket.emit('join', { room });
};

export const emit = ({ room, msg }) => {
  socket.emit('send', { room, msg });
};

export const sub = () => {
  socket.on('reply', payload => {
    console.log(payload);
  });
};
