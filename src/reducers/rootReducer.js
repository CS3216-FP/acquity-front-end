import { combineReducers } from 'redux';

import chat from 'reducers/ChatDux';
import securities from 'reducers/SecuritiesDux';
import misc from 'reducers/MiscDux';
import socket from 'reducers/SocketDux';

const rootReducer = combineReducers({
  chat,
  securities,
  misc,
  socket
});

export default rootReducer;
