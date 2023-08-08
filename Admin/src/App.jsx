import { RouterProvider } from 'react-router-dom';
import router from './routes/router.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loggedInUser } from './features/auth/authApiSlice.jsx';
import { setMessageEmpty } from './features/auth/authSlice.jsx';
import { fetchAllPermission, fetchAllRole, fetchAllUser } from './features/user/userApiSlice.jsx';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem('user')) {
      dispatch(loggedInUser());
      dispatch(fetchAllPermission());
      dispatch(fetchAllRole());
      dispatch(setMessageEmpty());
      dispatch(fetchAllUser());
    }
  }, [dispatch]);

  return (
    <>
      <ToastContainer />
      <RouterProvider router={router} />;
    </>
  );
}

export default App;
