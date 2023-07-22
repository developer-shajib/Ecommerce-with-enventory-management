import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// <!-- register user -->
export const register = createAsyncThunk('auth/register', async (data) => {
  try {
    const response = await axios.post(`${import.meta.env.VITE_API_URI}/api/v1/auth/register`, data);

    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});

// <!-- Login User -->
export const login = createAsyncThunk('auth/login', async (data) => {
  try {
    const response = await axios.post(`${import.meta.env.VITE_API_URI}/api/v1/auth/login`, data, { withCredentials: true });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});

// <!-- Logout User -->
export const logout = createAsyncThunk('auth/logout', async () => {
  try {
    const response = await axios.post(`${import.meta.env.VITE_API_URI}/api/v1/auth/logout`, {}, { withCredentials: true });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});

// <!-- Logged In User -->
export const loggedInUser = createAsyncThunk('auth/loggedInUser', async () => {
  try {
    const response = await axios.get('http://localhost:5050/api/v1/auth/me', { withCredentials: true });

    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});
