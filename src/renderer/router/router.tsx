import { createHashRouter } from 'react-router-dom';
import Dashboard from 'renderer/pages/Dashboard';
import Login from 'renderer/pages/Login';
import Root from './Root';
import Register from 'renderer/pages/Register';

const router = createHashRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: 'dashboard',
        element: <Dashboard />,
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
]);

export default router;
