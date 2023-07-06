import Layout from '../components/Layout/Layout.jsx';
import Dashboard from '../pages/dashboard/Dashboard.jsx';
import User from '../pages/user/User.jsx';

// Create Router
const privateRouter = [
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Dashboard />,
      },
      {
        path: '/user',
        element: <User />,
      },
    ],
  },
];

export default privateRouter;
