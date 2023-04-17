import Loader from 'renderer/components/Loader';
import { IJobResponse } from 'renderer/interfaces';
import { useGetAllJobsQuery } from 'renderer/redux/services/job';

const jobStatusArray = [
  'pending',
  'ghosted',
  'rejected',
  'interview',
  'test',
  'revived',
];

const Jobs = () => {
  const { data, isError, isLoading } = useGetAllJobsQuery({});
  console.log(data);

  return isLoading ? (
    <div className="w-full h-full flex justify-center items-center">
      <Loader />
    </div>
  ) : (
    <div className="w-full h-full p-8">
      <h1 className="text-4xl font-bold text-primary">Your Job Applications</h1>
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
        <div className="mt-12">
          {data.count === 0 ? (
            <div className="h-5/6 flex items-center justify-center">
              <h2 className="text-2xl font-semibold text-center">
                No job application to display
              </h2>
            </div>
          ) : (
            // todo fiw z-index bug
            data.jobs?.map((item: IJobResponse, i: number) => (
              <div className="indicator " key={i}>
                <div className="dropdown indicator-item indicator-top z-10">
                  <label
                    tabIndex={0}
                    className={`btn z-10 ${
                      item.status === 'pending'
                        ? 'btn-warning'
                        : item.status === 'ghosted'
                        ? 'btn-error-content'
                        : item.status === 'rejected'
                        ? 'btn-error'
                        : item.status === 'interview'
                        ? 'btn-primary'
                        : item.status === 'test'
                        ? 'btn-accent'
                        : 'btn-secondary'
                    }`}
                  >
                    {item.status}
                  </label>
                  <ul
                    tabIndex={0}
                    className="dropdown-content menu p-2 shadow bg-base-300 rounded-box w-52 z-20"
                  >
                    {jobStatusArray
                      .filter((status) => status !== item.status)
                      .map((status, i) => (
                        <li key={i}>
                          <a
                            className={`w-[90%] uppercase ${
                              status === 'pending'
                                ? 'text-warning'
                                : status === 'ghosted'
                                ? 'text-error-content'
                                : status === 'rejected'
                                ? 'text-error'
                                : status === 'interview'
                                ? 'text-primary'
                                : status === 'test'
                                ? 'text-accent'
                                : 'text-secondary'
                            }`}
                          >
                            {status}
                          </a>
                        </li>
                      ))}
                  </ul>
                </div>
                <div className="card w-96 bg-base-100 shadow-xl">
                  <div className="card-body">
                    <h2 className="card-title uppercase">{item.company}</h2>
                    <p className="capitalize">{item.position}</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Jobs;
