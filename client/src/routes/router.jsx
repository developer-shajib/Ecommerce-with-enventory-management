import { createBrowserRouter } from 'react-router-dom';
import publicRouter from './publicRouter.jsx';
import privateRouter from './privateRouter.jsx';

// Create Browser Router
const router = createBrowserRouter([...publicRouter, ...privateRouter]);

export default router;
