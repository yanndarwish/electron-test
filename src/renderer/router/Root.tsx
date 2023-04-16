import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';

const Root = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state: any) => state.authSlice.loggedIn);

  useEffect(() => {
    !isLoggedIn && navigate('/login');
  }, [location.pathname]);

  return (
    <div className="drawer drawer-mobile">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Page content here */}
        <label
          htmlFor="my-drawer-2"
          className="btn btn-primary drawer-button lg:hidden"
        >
          Open drawer
        </label>
        <Outlet />
      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer-2" className="drawer-overlay" />
        <ul className="menu p-4 pe-8 w-80 bg-base-100 text-base-content">
          {/* Sidebar content here */}
          <li>
            <Link to="/" className="w-full">
              Home
            </Link>
          </li>
          <li>
            <Link to="/dashboard" className="w-full">
              Dashboard
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Root;
