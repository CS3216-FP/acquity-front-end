// Reducer for manipulating global load state
import { createSlice } from 'redux-starter-kit';

/* eslint-disable no-param-reassign */
const loading = createSlice({
  name: 'loading',
  initialState: {
    isSocketConnected: false,
    isChatLoaded: false
  },
  reducers: {
    // This is only for the app to track global state of connectedness
    setChatSocketConnected: state => {
      state.isSocketConnected = true;
    },
    setChatLoaded: state => {
      state.isChatLoaded = true;
    }
  }
});
/* eslint-enable no-param-reassign */

export const { setChatSocketConnected, setChatLoaded } = loading.actions;

export default loading.reducer;
