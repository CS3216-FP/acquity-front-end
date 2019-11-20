import { combineReducers } from 'redux';

import chat from 'reducers/ChatDux';
import securities from 'reducers/SecuritiesDux';
import misc from 'reducers/MiscDux';
import loading from 'reducers/LoadingDux';

const rootReducer = combineReducers({
  chat,
  securities,
  misc,
  loading
});

export default rootReducer;
