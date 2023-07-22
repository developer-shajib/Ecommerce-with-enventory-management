import { useSelector } from 'react-redux';
import { getAllAuthData } from '../features/auth/authSlice.jsx';
import { Navigate, Outlet } from 'react-router-dom';

const PublicGard = () => {
  const { user } = useSelector(getAllAuthData);

  if (localStorage.getItem('user') && user) {
    return user ? <Navigate to='/' /> : <Outlet />;
  }

  return <Outlet />;
};

export default PublicGard;
