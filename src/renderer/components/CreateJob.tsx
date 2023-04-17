import { Formik } from 'formik';
import * as yup from 'yup';
import { useCreateJobMutation } from 'renderer/redux/services/job';
import { IJob } from 'renderer/interfaces';
import Loader from 'renderer/components/Loader';
import { isApiResponse } from 'renderer/interfaces';
import { useEffect } from 'react';
import Confirm from './Confirm';

const initialValues: IJob = {
  company: '',
  position: '',
  link: '',
};

const jobSchema = yup.object().shape({
  company: yup.string().required('Company is required'),
  position: yup.string().required('Position is required'),
  link: yup.string().required('Link is required'),
});

const CreateJob = () => {
  const [createJob, { error, isLoading, isSuccess, reset, isUninitialized }] =
    useCreateJobMutation();

  const handleSubmit = (values: IJob) => {
    createJob(values);
  };

  useEffect(() => {
    if (isSuccess) {
      setTimeout(() => {
        reset();
      }, 2000);
    }
  }, [isSuccess]);

  return (
    <>
      <input type="checkbox" id="my-modal-4" className="modal-toggle" />
      <label
        htmlFor="my-modal-4"
        className="modal cursor-pointer bg-base-300/80"
      >
        <label
          className="modal-box relative min-h-[40vh] bg-base-200"
          htmlFor=""
        >
          {/* sucess message */}
          {isSuccess && (
            <div className="absolute top-0 right-0 left-0 bottom-0 flex justify-center items-center bg-base-300/80 z-10">
              <Confirm />
            </div>
          )}
          {/* action loader */}
          {isLoading && (
            <div className="absolute top-0 right-0 left-0 bottom-0 flex justify-center items-center bg-base-300/80 z-10">
              <Loader />
            </div>
          )}
          <h3 className="text-lg font-bold">Create a Job Application</h3>
          {/* form */}
          <Formik
            onSubmit={(values, { resetForm }) => {
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
                </div>
                {/* error message */}
                {error && isApiResponse(error) && (
                  <p className="mb-8 text-error">{error.data.msg}</p>
                )}
                {/* action button */}
                <div className="card-actions justify-center">
                  <button className="btn btn-primary" type="submit">
                    Create Job
                  </button>
                </div>
              </form>
            )}
          </Formik>
        </label>
      </label>
    </>
  );
};

export default CreateJob;
