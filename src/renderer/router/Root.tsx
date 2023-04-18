import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';

const Root = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state: any) => state.authSlice.loggedIn);
  const name = useSelector((state: any) => state.authSlice.name);

  useEffect(() => {
    !isLoggedIn && navigate('/login');
  }, [location.pathname]);

  return (
    <div className="h-screen">
      {/* navbar */}
      <div className="navbar bg-base-200 h-[10%] shadow-lg">
        <div className="flex-1">
          <h2 className="normal-case text-xl font-semibold pl-8">{name}</h2>
          <ul className=" flex flex-row p-4 pe-8 w-80 text-base-content">
            {/* Sidebar content here */}
            <li>
              <Link
                to="/"
                className={`btn  ${
                  location.pathname === '/' ? 'btn-primary' : 'btn-ghost'
                }`}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/jobs"
                className={`btn  ${
                  location.pathname === '/jobs' ? 'btn-primary' : 'btn-ghost'
                }`}
              >
                Jobs
              </Link>
            </li>
          </ul>
        </div>
        <div className="dropdown dropdown-end me-2">
          <label tabIndex={0} className="btn btn-ghost rounded-full p-0 h-0 ">
            <div className="avatar placeholder">
              <div className="bg-neutral-focus text-neutral-content w-10 rounded-full">
                <span>{name.split('')[0]}</span>
              </div>
            </div>
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <a className="w-[90%]">Item 1</a>
            </li>
            <li>
              <a className="w-[90%]">Item 2</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="h-[90%] bg-base-100">
        {/* Page content here */}

        <Outlet />
      </div>
    </div>
  );
};

export default Root;
