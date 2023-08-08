import { useSelector } from 'react-redux';
import { getAllAuthData } from '../features/auth/authSlice.jsx';

const useAuthUser = () => {
  const { user, isLoading, error, message } = useSelector(getAllAuthData);

  return { user, isLoading, error, message };
};

export default useAuthUser;
