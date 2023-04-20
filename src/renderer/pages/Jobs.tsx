import { useEffect, useState } from 'react';
// components
import Loader from 'renderer/components/Loader';
import JobCard from 'renderer/components/JobCard';
import Filter from 'renderer/components/Filter';
import Search from 'renderer/components/Search';
// interfaces
import { IJobResponse } from 'renderer/interfaces';
// redux endpoint
import { useGetAllJobsQuery } from 'renderer/redux/services/job';
// utils
import { filterJobs, sortJobs } from 'renderer/utils';

const Jobs = () => {
  const { data, isError, isLoading } = useGetAllJobsQuery();
  const [active, setActive] = useState<string>('all');
  const [query, setQuery] = useState<string>('');
  const [jobs, setJobs] = useState<IJobResponse[] | []>([]);

  const sortedJobs = data ? sortJobs(data?.jobs) : []

  useEffect(() => {
    setJobs(filterJobs(sortedJobs, query, active));
  }, [query, active]);

  return isLoading ? (
    // page loader
    <div className="w-full h-full flex justify-center items-center">
      <Loader />
    </div>
  ) : (
    <div className="w-full h-full p-8 min-h-max">
      <div className="flex justify-between">
        {/* page title */}
        <h1 className="text-4xl font-bold text-center md:text-left">
          Your Job Applications
        </h1>
      </div>
      {/* Title search */}
      <Search query={query} setQuery={setQuery} />
      {/* filters */}
      <Filter active={active} setActive={setActive} />
      {/* number of results */}
      <h1 className="text-2xl font-semibold text-center md:text-left">
        Number of results : {jobs.length}
      </h1>
      {/* container */}
      {isError ? (
        // error message
        <div className="h-5/6 flex items-center justify-center">
          <h2 className="text-2xl font-semibold text-center">
            Something wrong happened, try again later
          </h2>
        </div>
      ) : (
        <div className="grid grid-cols-1 place-items-center  gap-y-20 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-16 bg-base-200 p-8 rounded-3xl">
          {/* if no job applications */}
          {data?.count === 0 ? (
            <div className="h-5/6 flex items-center justify-center">
              <h2 className="text-2xl font-semibold text-center">
                No job application to display
              </h2>
            </div>
          ) : (
            // todo fix z-index bug
            // else display all cards
            jobs.map((job, i) => (
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
