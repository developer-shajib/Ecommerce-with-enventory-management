import Forgot from '../pages/auth/Forgot.jsx';
import Login from '../pages/auth/Login.jsx';
import Register from '../pages/auth/Register.jsx';
import ChangePass from '../pages/auth/changePass.jsx';
import PublicGard from './PublicGard.jsx';

// Create Router
const publicRouter = [
  {
    element: <PublicGard />,
    children: [
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/register',
        element: <Register />
      },
      {
        path: '/forget',
        element: <Forgot />
      },
      {
        path: '/forget/:token/:id',
        element: <ChangePass />
      }
    ]
  }
];

// const publicRouter = [
//   {
//     path: '/login',
//     element: <Login />
//   },
//   {
//     path: '/register',
//     element: <Register />
//   },
//   {
//     path: '/forget',
//     element: <Forgot />
//   }
// ];

export default publicRouter;
