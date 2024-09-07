import { createSlice } from '@reduxjs/toolkit';

const initialValue = {
  token: '',
  currentUser: [],
};

const globalSlice = createSlice({
  name: 'global',
  initialState: initialValue,
  reducers: {
    storeCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
    storeToken: (state, action) => {
      state.token = action.payload;
    },
    clearGlobal: (state) => {
      return { ...initialValue };
    },
  },
});

export const { storeCurrentUser, clearGlobal, storeToken } =
  globalSlice.actions;
export default globalSlice.reducer;
