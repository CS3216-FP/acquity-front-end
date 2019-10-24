import { combineReducers } from 'redux-starter-kit';
import chat from 'routes/chat/ChatDux';

const rootReducer = combineReducers({
  chat
});

export default rootReducer;
