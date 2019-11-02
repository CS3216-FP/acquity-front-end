/* eslint-disable no-param-reassign */
import { createSlice } from 'redux-starter-kit';

import { BUYER } from 'constants/user';

const misc = createSlice({
  name: 'misc',
  initialState: {
    userType: BUYER
  },
  reducers: {
    setUserType: (state, { payload }) => {
      state.userType = payload;
    }
  }
});

export const { setUserType } = misc.actions;

export default misc.reducer;
