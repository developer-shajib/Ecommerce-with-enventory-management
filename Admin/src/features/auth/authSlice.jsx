import { createSlice } from '@reduxjs/toolkit';
import { loggedInUser, login, logout, register } from './authApiSlice.jsx';

// <!-- Initial State -->
const initialState = {
  user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null,
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
    build
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.message = action.payload.message;
        state.isLoading = false;
      })
      .addCase(register.rejected, (state, action) => {
        state.error = action.error.message;
        state.isLoading = false;
      })
      // <!-- Login Api -->

      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload.user;
        localStorage.setItem('user', JSON.stringify(action.payload.user));
        state.message = action.payload.message;
        state.isLoading = false;
      })
      .addCase(login.rejected, (state, action) => {
        state.error = action.error.message;
        state.isLoading = false;
      })

      // <!-- Logout Api -->
      .addCase(logout.fulfilled, (state, action) => {
        state.user = null;
        localStorage.removeItem('user');
        state.message = action.payload.message;
        state.isLoading = false;
        state.error = false;
      })
      .addCase(logout.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
        state.message = false;
      })

      // <!-- LoggedIn User -->
      .addCase(loggedInUser.pending, (state) => {
        state.isLoading = true;
        state.message = '';
        state.error = '';
      })
      .addCase(loggedInUser.fulfilled, (state, action) => {
        // state.user = action.payload.user;
        state.isLoading = false;
        localStorage.setItem('user', JSON.stringify(action.payload.user));
      })
      .addCase(loggedInUser.rejected, (state) => {
        localStorage.removeItem('user');
        state.user = null;
        state.error = false;
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
