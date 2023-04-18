import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Loader from 'renderer/components/Loader';
import {
  useDeleteJobMutation,
  useGetSingleJobQuery,
  useUpdateJobMutation,
} from 'renderer/redux/services/job';
import { Formik } from 'formik';
import * as yup from 'yup';
import { IJobStatus, isApiResponse } from 'renderer/interfaces';
import Confirm from 'renderer/components/Confirm';

const jobSchema = yup.object().shape({
  company: yup.string().required('Company is required'),
  position: yup.string().required('Position is required'),
  link: yup.string().required('Link is required'),
  status: yup.string().required('Status is required'),
});

const jobStatusArray = [
  'pending',
  'ghosted',
  'rejected',
  'interview',
  'test',
  'revived',
];

const JobDetail = () => {
  const navigate = useNavigate();

  // variables
  const { id } = useParams();
  const [skip, setSkip] = useState(true);
  const [initialValues, setInitialValues] = useState<IJobStatus>({
    company: '',
    position: '',
    link: '',
    status: '',
  });

  // api
  const { data, isLoading, isError } = useGetSingleJobQuery({ id }, { skip });
  const [
    deleteJob,
    {
      isSuccess: isDeleteSuccess,
      isLoading: deleteLoading,
      error: deleteError,
    },
  ] = useDeleteJobMutation();
  const [updateJob, { isSuccess, isLoading: updateLoading, error, reset }] =
    useUpdateJobMutation();

  // functions
  const handleDelete = (id: string | undefined) => {
    navigate('/jobs');
    deleteJob({ id });
  };

  const handleSubmit = (values: IJobStatus) => {
    updateJob({ id, payload: values });
  };

  // initiate fetch
  useEffect(() => {
    if (id) {
      setSkip(false);
    }
  }, [id]);

  // set initial values after data has arrived
  useEffect(() => {
    if (data?.job) {
      setInitialValues({
        company: data?.job.company,
        position: data?.job.position,
        link: data?.job.link,
        status: data?.job.status,
      });
    }
  }, [data]);

  useEffect(() => {
    if (isSuccess) {
      setTimeout(() => {
        reset();
        navigate('/jobs');
      }, 1500);
    }
  }, [isSuccess]);

  return isLoading ? (
    // page loader
    <div className="w-full h-full flex justify-center items-center">
      <Loader />
    </div>
  ) : isSuccess || isDeleteSuccess ? (
    // success message
    <div className="w-full h-full  flex justify-center items-center">
      <Confirm />
    </div>
  ) : (
    <div className="w-full h-full p-8 flex items-center justify-center">
      <div className="card w-96 bg-base-200 shadow-xl relative">
        {/* action loaders */}
        {(updateLoading || deleteLoading) && (
          <div className="absolute top-0 right-0 left-0 bottom-0 flex justify-center items-center bg-base-300/80 z-10 rounded-lg">
            <Loader />
          </div>
        )}
        {/* form */}
        <div className="card-body">
          {initialValues.company && (
            <Formik
              onSubmit={(values: IJobStatus, { resetForm }) => {
                handleSubmit(values);
                resetForm({ values: initialValues });
              }}
              initialValues={initialValues}
              validationSchema={jobSchema}
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
                  {/* form inputs */}
                  <div className="card-content w-full p-4 my-2 flex flex-col gap-2">
                    <div className="form-control w-full">
                      <input
                        type="text"
                        placeholder="Company"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.company}
                        name="company"
                        className="input input-bordered w-full bg-base-200"
                      />
                      <label className="label">
                        {!!touched.company && !!errors.company && (
                          <span className="label-text-alt text-error">
                            Company is required
                          </span>
                        )}
                      </label>
                    </div>
                    <div className="form-control w-full">
                      <input
                        type="text"
                        placeholder="Position"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.position}
                        name="position"
                        className="input input-bordered w-full bg-base-200"
                      />
                      <label className="label">
                        {!!touched.position && !!errors.position && (
                          <span className="label-text-alt text-error">
                            Position is required
                          </span>
                        )}
                      </label>
                    </div>
                    <div className="form-control w-full">
                      <input
                        type="text"
                        placeholder="Job Link"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.link}
                        name="link"
                        className="input input-bordered w-full bg-base-200"
                      />
                      <label className="label">
                        {!!touched.link && !!errors.link && (
                          <span className="label-text-alt text-error">
                            Link is required
                          </span>
                        )}
                      </label>
                    </div>
                    <div className="form-control w-full">
                      <select
                        className="select select-bordered bg-base-200"
                        name="status"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        defaultValue={values.status}
                      >
                        <option disabled className="uppercase">
                          {data?.job.status}
                        </option>
                        {jobStatusArray
                          .filter((item) => item !== data?.job.status)
                          .map((stat, i) => (
                            <option key={i} className="uppercase">
                              {stat}
                            </option>
                          ))}
                      </select>
                    </div>
                  </div>
                  {/* error messages */}
                  {error && isApiResponse(error) && (
                    <p className="mb-8 text-error">{error.data.msg}</p>
                  )}
                  {deleteError && isApiResponse(deleteError) && (
                    <p className="mb-8 text-error">{deleteError.data.msg}</p>
                  )}
                  {/* action buttons */}
                  <div className="card-actions justify-center">
                    <button
                      className="btn btn-ghost text-error"
                      type="button"
                      onClick={() => handleDelete(data?.job._id)}
                    >
                      Delete Job
                    </button>
                    <button className="btn btn-primary" type="submit">
                      Update Job
                    </button>
                  </div>
                </form>
              )}
            </Formik>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobDetail;
