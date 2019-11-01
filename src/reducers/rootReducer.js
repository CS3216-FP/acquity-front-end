import { combineReducers } from 'redux-starter-kit';
import chat from 'reducers/ChatDux';
import securities from 'reducers/SecuritiesDux';

const rootReducer = combineReducers({
  chat,
  securities
});

export default rootReducer;
