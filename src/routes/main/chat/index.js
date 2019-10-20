import Moment from 'react-moment';

import Socket from './socketService';

Moment.startPooledTimer();
Socket.initialize();

export { default } from './Chat';
