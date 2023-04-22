// router
import { createHashRouter } from 'react-router-dom';
// root
import Root from './Root';
// pages
import Home from 'renderer/pages/Home';
import Login from 'renderer/pages/Login';
import Register from 'renderer/pages/Register';
import Jobs from 'renderer/pages/Jobs';
import JobDetail from 'renderer/pages/JobDetail';

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
      {
        path: 'jobs/:id',
        element: <JobDetail />,
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
