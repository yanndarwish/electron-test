import { createHashRouter } from 'react-router-dom';
import Home from 'renderer/pages/Home';
import Login from 'renderer/pages/Login';
import Root from './Root';
import Register from 'renderer/pages/Register';
import Jobs from 'renderer/pages/Jobs';

const router = createHashRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: 'jobs',
        element: <Jobs />,
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
