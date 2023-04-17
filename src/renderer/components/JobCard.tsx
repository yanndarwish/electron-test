import { FiExternalLink } from 'react-icons/fi';
import { IJobResponse } from 'renderer/interfaces';

const jobStatusArray = [
  'pending',
  'ghosted',
  'rejected',
  'interview',
  'test',
  'revived',
];

export interface IJobCardProps {
  job: IJobResponse;
}

const JobCard = (props: IJobCardProps) => {
  return (
    <div className="indicator">
      <div className="dropdown indicator-item indicator-top z-10">
        <label
          tabIndex={0}
          className={`btn z-10 ${
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
        </label>
        <ul
          tabIndex={0}
          className="dropdown-content menu p-2 shadow bg-base-300 rounded-box z-20"
        >
          {jobStatusArray
            .filter((status) => status !== props.job.status)
            .map((status, i) => (
              <li key={i}>
                <a
                  className={`w-[100%] uppercase m-0 text-sm ${
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
      <div className="card bg-base-200 shadow-xl flex-shrink flex-grow">
        <div className="card-body">
          <h2 className="card-title uppercase">{props.job.company}</h2>
          <p className="capitalize">{props.job.position}</p>
          {/* todo find way to trigger external links */}
          <a href={props.job.link} className="flex items-center gap-4 text-info">
            Check website
            <FiExternalLink size={18} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
