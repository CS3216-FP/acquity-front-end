// Reducer for manipulating global load state
import { createSlice } from 'redux-starter-kit';

/* eslint-disable no-param-reassign */
const loading = createSlice({
  name: 'loading',
  initialState: {
    isSocketConnected: false,
    isSocketError: false,
    isChatLoaded: false,
    isChatError: false
  },
  reducers: {
    // This is only for the app to track global state of connectedness
    setChatSocketConnected: state => {
      state.isSocketConnected = true;
      state.isSocketError = false;
    },
    setChatLoaded: state => {
      state.isChatLoaded = true;
      state.isChatError = false;
    },
    setChatError: state => {
      state.isChatError = true;
    },
    setChatSocketError: state => {
      state.isSocketError = true;
    }
  }
});
/* eslint-enable no-param-reassign */

export const {
  setChatSocketConnected,
  setChatSocketError,
  setChatLoaded,
  setChatError
} = loading.actions;

export default loading.reducer;
