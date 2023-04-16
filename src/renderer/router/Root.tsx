import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { HiMenu } from 'react-icons/hi';

const Root = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state: any) => state.authSlice.loggedIn);
  const name = useSelector((state: any) => state.authSlice.name);

  useEffect(() => {
    !isLoggedIn && navigate('/login');
  }, [location.pathname]);

  return (
    <div className="drawer drawer-mobile">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* navbar */}
        <div className="navbar bg-base-100">
          <div className="flex-none">
            <label
              htmlFor="my-drawer-2"
              className="btn btn-ghost btn-square drawer-button lg:hidden"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block w-5 h-5 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </label>
          </div>
          <div className="flex-1">
            <a className="btn btn-ghost normal-case text-xl">{name}</a>
          </div>
          <div className="flex gap-x-4">
            <button className="btn btn-square btn-ghost">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block w-5 h-5 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
                ></path>
              </svg>
            </button>
            <div className="avatar placeholder">
              <div className="bg-neutral-focus text-neutral-content w-10 rounded-full">
                <span>{name.split('')[0]}</span>
              </div>
            </div>
          </div>
        </div>
        {/* Page content here */}
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
