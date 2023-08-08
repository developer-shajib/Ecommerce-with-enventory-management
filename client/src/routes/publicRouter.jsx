import Shop from '../pages/Shop/shop.jsx';
import Home from '../pages/home/Home.jsx';
import ShopSingle from '../pages/single/ShopSingle.jsx';

// Create Router
const publicRouter = [
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/shop',
    element: <Shop />
  },
  {
    path: '/shop/:id',
    element: <ShopSingle />
  }
];

export default publicRouter;
