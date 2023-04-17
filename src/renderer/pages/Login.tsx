import { Formik } from 'formik';
import * as yup from 'yup';
import { useLoginMutation } from 'renderer/redux/services/auth';
import { Login } from 'renderer/types';
import Loader from 'renderer/components/Loader';
import { isApiResponse } from 'renderer/interfaces';
import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';

const initialValues: Login = {
  email: 'dummy@gmail.com',
  password: 'secret',
};

const loginSchema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().min(6).required('Password is required'),
});

const Login = () => {
  const navigate = useNavigate();
  const [login, { error, isLoading, isSuccess }] = useLoginMutation();

  const handleSubmit = (values: Login) => {
    login(values);
  };

  useEffect(() => {
    isSuccess && navigate('/');
  }, [isSuccess]);

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="card w-96 bg-base-200 text-base-content overflow-hidden">
        <div className="card-body items-center text-center">
          <h2 className="card-title">Login</h2>
          <Formik
            onSubmit={handleSubmit}
            initialValues={initialValues}
            validationSchema={loginSchema}
          >
            {({
              values,
              errors,
              touched,
              handleBlur,
              handleChange,
              handleSubmit,
            }) => (
              <form onSubmit={handleSubmit} className="w-full">
                {isLoading && (
                  <div className="absolute top-0 right-0 left-0 bottom-0 flex justify-center items-center bg-neutral-50/70">
                    <Loader />
                  </div>
                )}
                <div className="card-content w-full p-4 my-2 flex flex-col gap-2">
                  <div className="form-control w-full max-w-xs">
                    <input
                      type="text"
                      placeholder="Email"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.email}
                      name="email"
                      className="input input-bordered w-full max-w-xs"
                    />
                    <label className="label">
                      {!!touched.email && !!errors.email && (
                        <span className="label-text-alt text-error">
                          Email is required
                        </span>
                      )}
                    </label>
                  </div>
                  <div className="form-control w-full max-w-xs">
                    <input
                      type="password"
                      placeholder="Password"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.password}
                      name="password"
                      className="input input-bordered w-full max-w-xs"
                    />
                    <label className="label">
                      {!!touched.password && !!errors.password && (
                        <span className="label-text-alt text-error">
                          Password is required
                        </span>
                      )}
                    </label>
                  </div>
                </div>
                {error && isApiResponse(error) && (
                  <p className="mb-8 text-error">{error.data.msg}</p>
                )}
                <div className="card-actions justify-center">
                  <button
                    className="btn btn-ghost"
                    type="button"
                    onClick={() => navigate('/register')}
                  >
                    Sign Up
                  </button>
                  <button className="btn btn-primary" type="submit">
                    Sign In
                  </button>
                </div>
              </form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Login;
