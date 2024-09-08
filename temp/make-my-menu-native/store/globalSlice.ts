import { createSlice } from '@reduxjs/toolkit';
import { stat } from 'fs';

const initialValue = {
  token: '',
  currentUser: {},
  restaurants: [],
  imageApiLoading: false,
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
    storeRestaurants: (state, action) => {
      state.restaurants = action.payload;
    },
    storeApiLoading: (state, action) => {
      state.imageApiLoading = action.payload;
    },
  },
});

export const {
  storeCurrentUser,
  clearGlobal,
  storeToken,
  storeRestaurants,
  storeApiLoading,
} = globalSlice.actions;
export default globalSlice.reducer;
