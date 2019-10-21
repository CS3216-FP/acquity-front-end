import { combineReducers } from 'redux-starter-kit';
import chat from 'routes/chat/Chat.ducks';

const rootReducer = combineReducers({
  chat
});

export default rootReducer;
