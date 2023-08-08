import { createSlice } from '@reduxjs/toolkit';
import { changePass, createPermission, createRole, createUser, deletePermission, deleteRole, deleteUser, fetchAllPermission, fetchAllRole, fetchAllUser, updatePermission, updateRole, updateUser } from './userApiSlice.jsx';

// <!-- initial state -->
const initialState = {
  permission: null,
  role: null,
  user: null,
  isLoading: false,
  error: '',
  message: ''
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setMessageEmpty: (state) => {
      state.message = '';
      state.error = '';
    }
  },
  extraReducers: (build) => {
    build
      // <!-- get all permission -->
      .addCase(fetchAllPermission.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllPermission.fulfilled, (state, action) => {
        state.permission = action.payload.permissions;
        state.message = '';
        state.isLoading = false;
      })
      .addCase(fetchAllPermission.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })

      // <!-- create permission -->
      .addCase(createPermission.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createPermission.fulfilled, (state, action) => {
        state.permission = state.permission ?? [];
        state.permission.push(action.payload.permission);
        state.message = 'New permission created';
        state.isLoading = false;
      })
      .addCase(createPermission.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })

      // <!-- delete permission -->
      .addCase(deletePermission.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deletePermission.fulfilled, (state, action) => {
        state.permission = state.permission.filter((item) => item._id !== action.payload.permission._id);
        state.message = action.payload.message;
        state.isLoading = false;
      })
      .addCase(deletePermission.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })

      // <!-- update permission -->
      .addCase(updatePermission.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updatePermission.fulfilled, (state, action) => {
        state.permission[state.permission.findIndex((data) => data._id == action.payload.permission._id)] = action.payload.permission;
        state.message = action.payload.message;
        state.isLoading = false;
      })
      .addCase(updatePermission.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })

      // <!-- get all Role -->
      .addCase(fetchAllRole.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllRole.fulfilled, (state, action) => {
        let allRoles = [];
        action.payload.roles.map((item) => {
          const validStatusData = item.permissions.filter((data) => data.status === true);

          item.permissions = validStatusData;
          allRoles.push(item);
        });
        state.role = allRoles;
        state.message = '';
        state.isLoading = false;
      })
      .addCase(fetchAllRole.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })

      // <!-- create role -->
      .addCase(createRole.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createRole.fulfilled, (state, action) => {
        state.role = state.role ?? [];
        state.role.push(action.payload.role);
        state.message = 'New role created';
        state.isLoading = false;
      })
      .addCase(createRole.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })

      // <!-- update role -->
      .addCase(updateRole.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateRole.fulfilled, (state, action) => {
        state.role[state.role.findIndex((data) => data._id === action.payload.data._id)] = action.payload.data;
        state.message = action.payload.message;
        state.isLoading = false;
      })
      .addCase(updateRole.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })

      // <!-- delete permission -->
      .addCase(deleteRole.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteRole.fulfilled, (state, action) => {
        state.role = state.role.filter((item) => item._id !== action.payload.data._id);
        state.message = action.payload.message;
        state.isLoading = false;
      })
      .addCase(deleteRole.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })

      // <!-- fetch all user -->
      .addCase(fetchAllUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllUser.fulfilled, (state, action) => {
        let userData = [];
        action.payload.data.map((item) => {
          item.role.status === false ? (item.role.name = 'None') : item.role.name;
          userData.push(item);
        });

        state.user = userData;
        state.message = '';
        state.isLoading = false;
      })
      .addCase(fetchAllUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })

      // <!-- Create user -->
      .addCase(createUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.user = state.user ?? [];
        state.user.push(action.payload.data);
        state.message = action.payload.message;
        state.isLoading = false;
      })
      .addCase(createUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })

      // <!-- Delete user -->
      .addCase(deleteUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.user = state.user.filter((data) => data._id !== action.payload.data._id);
        state.isLoading = false;
        state.message = action.payload.message;
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })

      // <!-- update user -->
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.user[state.user.findIndex((data) => data._id == action.payload.data._id)] = action.payload.data;

        state.message = action.payload.message;
        state.isLoading = false;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })

      .addCase(changePass.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(changePass.fulfilled, (state, action) => {
        state.message = action.payload.message;
        state.isLoading = false;
      })
      .addCase(changePass.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  }
});

// <!-- export user state data -->
export const getUserData = (state) => state.user;

// <!-- export actions -->
export const { setMessageEmpty } = userSlice.actions;

// <!-- export reducer -->
export default userSlice.reducer;
