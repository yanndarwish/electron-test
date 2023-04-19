import { IJobResponse } from './interfaces';

export const filterJobs = (
  jobs: IJobResponse[],
  query: string,
  status: string
) => {
  // filter by search query
  if (status === 'all' && query !== '') {
    return jobs.filter(
      (job) =>
        job.company.toLowerCase().includes(query.toLowerCase()) ||
        job.position.toLowerCase().includes(query.toLowerCase())
    );
    // filter by status
  } else if (status !== 'all' && query === '') {
    return jobs.filter((job) => job.status === status);
    // filter by search query and by status
  } else if (status !== 'all' && query !== '') {
    return jobs.filter(
      (job) =>
        job.status === status &&
        (job.company.toLowerCase().includes(query.toLowerCase()) ||
          job.position.toLowerCase().includes(query.toLowerCase()))
    );
  }
  // return unfiltered array
  return jobs;
};

// sort jobs by most recent
export const sortJobs = (jobs: IJobResponse[]) => {
  let sortedJobs = Object.assign([], jobs);

  sortedJobs = sortedJobs.sort((a: IJobResponse, b: IJobResponse) =>
    a.createdAt > b.createdAt ? -1 : 1
  );

  return sortedJobs;
};

export const formatDate = (fullDateString: string) => {
  const dateArray = fullDateString.split('T')[0].split('-');
  return `${dateArray[2]}/${dateArray[1]}/${dateArray[0]}`;
};
