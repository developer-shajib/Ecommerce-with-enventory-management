import Forgot from '../pages/auth/Forgot.jsx';
import Login from '../pages/auth/Login.jsx';
import Register from '../pages/auth/Register.jsx';

// Create Router
const publicRouter = [
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/forget',
    element: <Forgot />,
  },
];

export default publicRouter;
