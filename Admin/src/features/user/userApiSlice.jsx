import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

/**
 * @desc Permission Api Slice
 */
// <!-- fetch all permission -->
export const fetchAllPermission = createAsyncThunk('user/fetchAllPermission', async () => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_URI}/api/v1/permission`, { withCredentials: true });

    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});

// <!-- create permission -->
export const createPermission = createAsyncThunk('user/createPermission', async (data) => {
  try {
    const response = await axios.post(`${import.meta.env.VITE_API_URI}/api/v1/permission`, { name: data }, { withCredentials: true });

    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});

// <!-- delete permission -->
export const deletePermission = createAsyncThunk('user/deletePermission', async (id) => {
  try {
    const response = await axios.delete(`${import.meta.env.VITE_API_URI}/api/v1/permission/${id}`, { withCredentials: true });

    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});

// <!-- update permission -->
export const updatePermission = createAsyncThunk('user/updatePermission', async ({ id, data }) => {
  try {
    const response = await axios.patch(`${import.meta.env.VITE_API_URI}/api/v1/permission/${id}`, data, { withCredentials: true });

    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});

/**
 * @desc Role Api Slice
 */
// <!-- fetch all permission -->
export const fetchAllRole = createAsyncThunk('user/fetchAllRole', async () => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_URI}/api/v1/role`, { withCredentials: true });

    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});

// <!-- create Role -->
export const createRole = createAsyncThunk('user/createRole', async (data) => {
  try {
    const response = await axios.post(`${import.meta.env.VITE_API_URI}/api/v1/role`, data, { withCredentials: true });

    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});

// <!-- update role -->
export const updateRole = createAsyncThunk('user/updateRole', async ({ id, data }) => {
  try {
    const response = await axios.patch(`${import.meta.env.VITE_API_URI}/api/v1/role/${id}`, data, { withCredentials: true });

    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});

// <!-- delete permission -->
export const deleteRole = createAsyncThunk('user/deleteRole', async (id) => {
  try {
    const response = await axios.delete(`${import.meta.env.VITE_API_URI}/api/v1/role/${id}`, { withCredentials: true });

    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});

/**
 * @desc User Api Slice
 */
// <!-- Get all user -->
export const fetchAllUser = createAsyncThunk('user/fetchAllUser', async () => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_URI}/api/v1/user`, { withCredentials: true });

    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});

// <!-- Create user -->
export const createUser = createAsyncThunk('user/createUser', async (data) => {
  try {
    const response = await axios.post(`${import.meta.env.VITE_API_URI}/api/v1/user`, data, { withCredentials: true });

    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});

// <!-- delete user -->
export const deleteUser = createAsyncThunk('user/deleteUser', async (id) => {
  try {
    const response = await axios.delete(`${import.meta.env.VITE_API_URI}/api/v1/user/${id}`, { withCredentials: true });

    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});

// <!-- update user -->
export const updateUser = createAsyncThunk('user/updateUser', async ({ id, data }) => {
  try {
    const response = await axios.patch(`${import.meta.env.VITE_API_URI}/api/v1/user/${id}`, data, { withCredentials: true });

    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});

// <!-- user profile password change -->
export const changePass = createAsyncThunk('user/changePass', async ({ id, data }) => {
  try {
    const response = await axios.post(`${import.meta.env.VITE_API_URI}/api/v1/user/password/${id}`, data, { withCredentials: true });

    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});
