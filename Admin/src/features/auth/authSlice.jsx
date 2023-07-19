import { createSlice } from '@reduxjs/toolkit';
import { login, register } from './authApiSlice.jsx';

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
    // <!-- Register Api -->

    build.addCase(register.pending, (state) => {
      state.isLoading = true;
    }),
      build.addCase(register.fulfilled, (state, action) => {
        state.message = action.payload.message;
        state.isLoading = false;
      }),
      build.addCase(register.rejected, (state, action) => {
        state.error = action.error.message;
        state.isLoading = false;
      }),
      // <!-- Login Api -->

      build.addCase(login.pending, (state) => {
        state.isLoading = true;
      }),
      build.addCase(login.fulfilled, (state, action) => {
        state.message = action.payload.message;
        state.user = action.payload.user;
        state.isLoading = false;
      }),
      build.addCase(login.rejected, (state, action) => {
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
