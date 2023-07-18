import { createSlice } from '@reduxjs/toolkit';
import { register } from './authApiSlice.jsx';

// <!-- Initial State -->
const initialState = {
  user: null,
  isLoading: false,
  message: '',
  error: ''
};

// <!-- create auth slice -->
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setMessageEmpty: (state, action) => {
      state.message = '';
      state.error = '';
    }
  },
  extraReducers: (build) => {
    build.addCase(register.pending, (state, action) => {
      state.isLoading = true;
    }),
      build.addCase(register.fulfilled, (state, action) => {
        state.message = action.payload.message;
        state.isLoading = false;
      }),
      build.addCase(register.rejected, (state, action) => {
        state.error = action.error.message;
        state.isLoading = false;
      });
  }
});

// <!-- export selectors -->
export const getAllAuthData = (state) => state.auth;

// <!-- export actions -->
export const { setMessageEmpty } = authSlice.actions;

// <!-- export reducer -->
export default authSlice.reducer;
