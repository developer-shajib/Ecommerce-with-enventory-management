import { useSelector } from 'react-redux';
import { getAllAuthData } from '../features/auth/authSlice.jsx';

const useAuthUser = () => {
  const { user } = useSelector(getAllAuthData);

  return { user };
};

export default useAuthUser;
