// react router, redux, react
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
// componenets
import CreateJob from 'renderer/components/CreateJob';
// icons
import { MdAdd } from 'react-icons/md';


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
      <div className="navbar bg-base-300 h-[10%] shadow-lg">
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
        {/* The button to open modal */}
        <label htmlFor="my-modal-4" className="btn btn-primary rounded-full me-4">
          <MdAdd />
        </label>
        {/* the Create Job modal */}
        <CreateJob />
      </div>
      <div className="min-h-[90%] bg-base-100">
        {/* Page content here */}

        <Outlet />
      </div>
    </div>
  );
};

export default Root;
