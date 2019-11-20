// Reducer for manipulating socket actions
import { createSlice } from 'redux-starter-kit';

/* eslint-disable no-param-reassign */
const socket = createSlice({
  name: 'socket',
  initialState: {
    isSocketConnected: false
  },
  reducers: {
    // This is only for the app to track global state of connectedness
    setChatSocketConnected: state => {
      state.isSocketConnected = true;
    }
  }
});
/* eslint-enable no-param-reassign */

export const { setChatSocketConnected } = socket.actions;

export default socket.reducer;
