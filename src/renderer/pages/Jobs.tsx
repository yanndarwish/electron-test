import Loader from 'renderer/components/Loader';
import { IJobResponse } from 'renderer/interfaces';
import { useGetAllJobsQuery } from 'renderer/redux/services/job';
import { MdAdd } from 'react-icons/md';
import JobCard from 'renderer/components/JobCard';
import CreateJob from 'renderer/components/CreateJob';

const Jobs = () => {
  const { data, isError, isLoading } = useGetAllJobsQuery({});

  return isLoading ? (
    // page loader
    <div className="w-full h-full flex justify-center items-center">
      <Loader />
    </div>
  ) : (
    <div className="w-full h-full p-8">
      <div className="flex justify-between">
        {/* page title */}
        <h1 className="text-4xl font-bold text-center md:text-left">
          Your Job Applications
        </h1>
        {/* The button to open modal */}
        <label htmlFor="my-modal-4" className="btn btn-primary rounded-full">
          <MdAdd />
        </label>
        {/* the Create Job modal */}
        <CreateJob />
      </div>
      {/* filters */}
      <div></div>
      {/* container */}
      {isError ? (
        // error message
        <div className="h-5/6 flex items-center justify-center">
          <h2 className="text-2xl font-semibold text-center">
            Something wrong happened, try again later
          </h2>
        </div>
      ) : (
        <div className="grid grid-cols-1 place-items-center  gap-y-20 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-16">
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
              <JobCard job={job} key={i} />
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Jobs;
