import { combineReducers } from 'redux-starter-kit';
import chatReducer from '../routes/main/chat/chatReducer';

const rootReducer = combineReducers({
  chat: chatReducer
});

export default rootReducer;
