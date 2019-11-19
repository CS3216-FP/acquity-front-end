/* eslint-disable no-param-reassign */
import { createSlice } from 'redux-starter-kit';

import { BUYER } from 'constants/user';

const misc = createSlice({
  name: 'misc',
  initialState: {
    userType: BUYER,
    user: null,
    isBannerHidden: false
  },
  reducers: {
    setUserType: (state, { payload }) => {
      state.userType = payload;
    },
    setUser: (state, { payload }) => {
      state.user = payload;
    },
    hideBanner: state => {
      state.isBannerHidden = true;
    },
    clearUser: state => {
      state.user = null;
    }
  }
});

export const { setUserType, setUser, clearUser, hideBanner } = misc.actions;

export default misc.reducer;
