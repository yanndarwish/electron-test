import { useNavigate } from 'react-router-dom';
import { IJobResponse } from 'renderer/interfaces';
import { formatDate } from 'renderer/utils';
import { FiExternalLink } from 'react-icons/fi';

export interface IJobCardProps {
  job: IJobResponse;
}

const JobCard = (props: IJobCardProps) => {
  const navigate = useNavigate();
  const date = formatDate(props.job.createdAt);

  return (
    <div
      className="card bg-base-100 shadow-xl flex-shrink flex-grow relative min-w-[300px] max-w-[300px]"
      onClick={() => navigate(`/jobs/${props.job._id}`)}
    >
      <div className="card-body">
        <div className="flex justify-between w-full items-center">
          <h2 className="card-title inline-block uppercase truncate">
            {props.job.company}
          </h2>
          {/* todo find way to trigger external links */}
          {props.job.link.startsWith('http') && (
            <a
              href={props.job.link}
              className="text-info p-0"
              target="_blank"
              rel="noreferrer"
              onClick={(e) => e.stopPropagation()}
            >
              <FiExternalLink size={20} style={{ padding: 0 }} />
            </a>
          )}
        </div>
        <p className="capitalize mb-3 truncate text-ellipsis">
          {props.job.position}
        </p>
        <p className="mb-4">Applied the : {date}</p>
        {/* status */}
        <div
          className={`btn z-10 text-xs p-2 h-min min-h-min w-full ${
            props.job.status === 'pending'
              ? 'btn-accent'
              : props.job.status === 'ghosted'
              ? 'btn-error-content'
              : props.job.status === 'rejected'
              ? 'btn-error'
              : props.job.status === 'interview'
              ? 'btn-success'
              : props.job.status === 'test'
              ? 'btn-info'
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
