/* eslint-disable no-param-reassign */
import { createSlice } from 'redux-starter-kit';

const securities = createSlice({
  name: 'securities',
  initialState: {
    securities: [],
    currentSelectedBuySecurity: null,
    currentSelectedSellSecurity: null
  },
  reducers: {
    updateSecurities: (state, { payload }) => {
      state.securities = payload;
      if (payload.length > 0) {
        const [firstSecurity] = payload;
        if (!state.currentSelectedBuySecurity) {
          state.currentSelectedBuySecurity = firstSecurity;
        }
        if (!state.currentSelectedSellSecurity) {
          state.currentSelectedSellSecurity = firstSecurity;
        }
      }
    },
    setCurrentSelectedBuySecurity: (state, { payload }) => {
      state.currentSelectedBuySecurity = payload;
    },
    setCurrentSelectedSellSecurity: (state, { payload }) => {
      state.currentSelectedSellSecurity = payload;
    }
  }
});

export const {
  updateSecurities,
  setCurrentSelectedBuySecurity,
  setCurrentSelectedSellSecurity
} = securities.actions;

export default securities.reducer;
