import { createSlice } from '@reduxjs/toolkit';

// <!-- Initial State -->
const initialState = {
  user: null,
  isLoading: false,
  isSuccess: false,
  error: false,
  message: ''
};

// <!-- create auth slice -->
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (build) => {}
});

// <!-- export selectors -->
export const getAllAuthData = (state) => state.auth;

// <!-- export actions -->
export const {} = authSlice.actions;

// <!-- export reducer -->
export default authSlice.reducer;
