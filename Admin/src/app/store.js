import { configureStore } from '@reduxjs/toolkit';
import authReducers from '../features/auth/authSlice.jsx';

// Create store
const store = configureStore({
  reducer: {
    auth: authReducers
  },
  devTools: true
});

//export
export default store;
