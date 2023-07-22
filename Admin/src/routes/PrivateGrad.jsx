import { useSelector } from 'react-redux';
import { getAllAuthData } from '../features/auth/authSlice.jsx';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateGrad = () => {
  const { user } = useSelector(getAllAuthData);

  if (localStorage.getItem('user') && user) {
    return user ? <Outlet /> : <Navigate to='/login' />;
  }

  return <Navigate to='/login' />;
};

export default PrivateGrad;
