import { FiExternalLink } from 'react-icons/fi';
import { IJobResponse } from 'renderer/interfaces';
import { useNavigate } from 'react-router-dom';

export interface IJobCardProps {
  job: IJobResponse;
}

const JobCard = (props: IJobCardProps) => {
  const navigate = useNavigate();

  return (
    <div
      className="card bg-base-200 shadow-xl flex-shrink flex-grow relative min-w-[300px]"
      onClick={() => navigate(`/jobs/${props.job._id}`)}
    >
      <div className="card-body">
        <div className="flex justify-between w-full">
          <h2 className="card-title uppercase">{props.job.company}</h2>
          {/* todo find way to trigger external links */}
          <a href={props.job.link} className="text-info p-0">
            <FiExternalLink size={20} style={{ padding: 0 }} />
          </a>
        </div>
        <p className="capitalize mb-4">{props.job.position}</p>
        {/* status */}
        <div
          className={`btn z-10 text-xs p-2 h-min min-h-min w-full ${
            props.job.status === 'pending'
              ? 'btn-warning'
              : props.job.status === 'ghosted'
              ? 'btn-error-content'
              : props.job.status === 'rejected'
              ? 'btn-error'
              : props.job.status === 'interview'
              ? 'btn-primary'
              : props.job.status === 'test'
              ? 'btn-accent'
              : 'btn-secondary'
          }`}
        >
          {props.job.status}
        </div>
      </div>
    </div>
  );
};

export default JobCard;
