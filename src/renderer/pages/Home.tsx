// components
import BarChart from 'renderer/components/Charts/BarChart';
import PieChart from 'renderer/components/Charts/PieChart';
import StatBox from 'renderer/components/StatBox';
// interfaces
import { IJobResponse } from 'renderer/interfaces';
// redux
import { useGetAllJobsQuery } from 'renderer/redux/services/job';
import {
  addToRevive,
  resetToRevive,
} from 'renderer/redux/features/jobSlice';
import { useSelector, useDispatch } from 'react-redux';
// utils
import { shouldRevive } from 'renderer/utils';
import { useEffect, useState } from 'react';
import ReviveModal from 'renderer/components/ReviveModal';

const Home = () => {
  useGetAllJobsQuery();
  const dispatch = useDispatch();

  const [reviveModal, setReviveModal] = useState<boolean>(false);

  const jobs: IJobResponse[] = useSelector((state: any) => state.jobSlice.jobs);
  const totalCount: number = useSelector((state: any) => state.jobSlice.count);
  const jobsToRevive: IJobResponse[] = useSelector(
    (state: any) => state.jobSlice.toRevive
  );
  const ignoreRevive = useSelector((state: any) => state.jobSlice.ignoreRevive);

  const pendingCount = jobs.filter((item) => item.status === 'pending').length;
  const interviewCount = jobs.filter(
    (item) => item.status === 'interview'
  ).length;
  const rejectedCount = jobs.filter(
    (item) => item.status === 'rejected'
  ).length;

  const checkForRevive = (jobs: IJobResponse[]) => {
    dispatch(resetToRevive({}));

    jobs
      .filter((job) => job.status === 'pending')
      .forEach((job) => {
        if (shouldRevive(job)) {
          dispatch(addToRevive(job));
          if (!ignoreRevive) {
            setReviveModal(true);
          }
        }
      });
  };

  useEffect(() => {
    checkForRevive(jobs);
  }, [jobs]);

  return (
    <div className="w-full h-full p-8">
      <h1 className="text-4xl font-bold">Your Dashboard</h1>
      <div>
        {/* Stat boxes */}
        <div className="grid grid-cols-1 place-items-center gap-y-12 sm:grid-cols-2 lg:grid-cols-4 my-8 bg-base-200 p-8 rounded-3xl">
          <StatBox title="total" count={totalCount} />
          <StatBox title="pending" count={pendingCount} />
          <StatBox title="rejected" count={rejectedCount} />
          <StatBox title="interview" count={interviewCount} />
        </div>
        {/* Charts Container */}
        <div className="grid grid-cols-1 lg:grid-cols-2 mt-8 gap-8">
          <div className="h-full bg-base-200 p-8 rounded-3xl">
            <BarChart jobs={jobs} />
          </div>
          <div className="h-full bg-base-200 p-8 rounded-3xl">
            <PieChart jobs={jobs} />
          </div>
        </div>
      </div>
      <ReviveModal
        jobs={jobsToRevive}
        open={reviveModal}
        setOpen={setReviveModal}
      />
    </div>
  );
};

export default Home;
