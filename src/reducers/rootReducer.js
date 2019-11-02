import { combineReducers } from 'redux-starter-kit';
import chat from 'reducers/ChatDux';
import securities from 'reducers/SecuritiesDux';
import misc from 'reducers/MiscDux';

const rootReducer = combineReducers({
  chat,
  securities,
  misc
});

export default rootReducer;
