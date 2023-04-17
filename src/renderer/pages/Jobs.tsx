import Loader from 'renderer/components/Loader';
import { IJobResponse } from 'renderer/interfaces';
import { useGetAllJobsQuery } from 'renderer/redux/services/job';
import { MdAdd } from 'react-icons/md';
import JobCard from 'renderer/components/JobCard';

const Jobs = () => {
  const { data, isError, isLoading } = useGetAllJobsQuery({});
  console.log(data);

  return isLoading ? (
    <div className="w-full h-full flex justify-center items-center">
      <Loader />
    </div>
  ) : (
    <div className="w-full h-full p-8">
      <div className="flex justify-between">
        <h1 className="text-4xl font-bold text-primary text-center md:text-left">
          Your Job Applications
        </h1>
        {/* The button to open modal */}
        <label htmlFor="my-modal-4" className="btn btn-primary rounded-full">
          <MdAdd />
        </label>
        <input type="checkbox" id="my-modal-4" className="modal-toggle" />
        <label htmlFor="my-modal-4" className="modal cursor-pointer">
          <label className="modal-box relative" htmlFor="">
            <h3 className="text-lg font-bold">
              Congratulations random Internet user!
            </h3>
            <p className="py-4">
              You've been selected for a chance to get one year of subscription
              to use Wikipedia for free!
            </p>
          </label>
        </label>
      </div>
      {/* filters */}
      <div></div>
      {/* container */}
      {isError ? (
        <div className="h-5/6 flex items-center justify-center">
          <h2 className="text-2xl font-semibold text-center">
            Something wrong happened, try again later
          </h2>
        </div>
      ) : (
        <div className="flex gap-20 mt-12 flex-wrap justify-center md:justify-start">
          {/* if no job applications */}
          {data.count === 0 ? (
            <div className="h-5/6 flex items-center justify-center">
              <h2 className="text-2xl font-semibold text-center">
                No job application to display
              </h2>
            </div>
          ) : (
            // todo fix z-index bug
            // else display all cards
            data.jobs?.map((job: IJobResponse, i: number) => (
              // job cards
              <JobCard job={job} key={i}/>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Jobs;
