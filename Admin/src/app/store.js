import { configureStore } from '@reduxjs/toolkit';
import authReducers from '../features/auth/authSlice.jsx';
import userReducers from '../features/user/useSlice.jsx';

// Create store
const store = configureStore({
  reducer: {
    auth: authReducers,
    user: userReducers
  },
  devTools: true
});

//export
export default store;
