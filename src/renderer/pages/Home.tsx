// components
import BarChart from 'renderer/components/Charts/BarChart';
import PieChart from 'renderer/components/Charts/PieChart';
import StatBox from 'renderer/components/StatBox';
// interfaces
import { IJobResponse } from 'renderer/interfaces';
// redux
import { useGetAllJobsQuery } from 'renderer/redux/services/job';
import { useSelector } from 'react-redux';

const Home = () => {
  useGetAllJobsQuery();

  const jobs: IJobResponse[] = useSelector((state: any) => state.jobSlice.jobs);
  const totalCount: number = useSelector((state: any) => state.jobSlice.count);

  const pendingCount = jobs.filter((item) => item.status === 'pending').length;
  const interviewCount = jobs.filter(
    (item) => item.status === 'interview'
  ).length;
  const rejectedCount = jobs.filter(
    (item) => item.status === 'rejected'
  ).length;

  return (
    <div className="w-full h-full p-8">
      <h1 className="text-4xl font-bold">Your Dashboard</h1>
      <div>
        {/* Stat boxes */}
        <div className="grid grid-cols-1 place-items-center gap-y-12 sm:grid-cols-2 lg:grid-cols-4 my-8">
          <StatBox title="total" count={totalCount} />
          <StatBox title="pending" count={pendingCount} />
          <StatBox title="rejected" count={rejectedCount} />
          <StatBox title="interview" count={interviewCount} />
        </div>
        {/* Charts Container */}
        <div className="grid grid-cols-1 lg:grid-cols-2 my-16 gap-12">
          <div className="h-full">
            <BarChart jobs={jobs} />
          </div>
          <div>
            <PieChart jobs={jobs} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
