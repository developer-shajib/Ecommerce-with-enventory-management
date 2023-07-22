import Layout from '../components/Layout/Layout.jsx';
import Dashboard from '../pages/dashboard/Dashboard.jsx';
import Permission from '../pages/permission/Permission.jsx';
import Role from '../pages/role/Role.jsx';
import User from '../pages/user/User.jsx';
import PrivateGrad from './PrivateGrad.jsx';

// Create Router
const privateRouter = [
  {
    element: <PrivateGrad />,
    children: [
      {
        element: <Layout />,
        children: [
          {
            path: '/',
            element: <Dashboard />
          },
          {
            path: '/user',
            element: <User />
          },
          {
            path: '/role',
            element: <Role />
          },
          {
            path: '/permission',
            element: <Permission />
          }
        ]
      }
    ]
  }
];

// const privateRouter = [
//   {
//     element: <Layout />,
//     children: [
//       {
//         path: '/',
//         element: <Dashboard />
//       },
//       {
//         path: '/user',
//         element: <User />
//       }
//     ]
//   }
// ];

export default privateRouter;
