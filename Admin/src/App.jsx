import { RouterProvider } from 'react-router-dom';
import router from './routes/router.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loggedInUser } from './features/auth/authApiSlice.jsx';
import { setMessageEmpty } from './features/auth/authSlice.jsx';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem('user')) {
      dispatch(loggedInUser());
      setMessageEmpty();
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
