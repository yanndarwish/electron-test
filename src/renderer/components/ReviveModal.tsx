import { IJobResponse } from 'renderer/interfaces';
import { FiExternalLink } from 'react-icons/fi';
import { formatDate } from 'renderer/utils';
import { useRef } from 'react';
import { setIgnoreRevive } from 'renderer/redux/features/jobSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export interface IReviveModalProps {
  open: boolean;
  setOpen: (val: boolean) => void;
  jobs: IJobResponse[];
}

const ReviveModal = (props: IReviveModalProps) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const overlayRef = useRef(null);

  const handleOutsideClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (e.target === overlayRef.current) {
      props.setOpen(false);
      dispatch(setIgnoreRevive(true));
    }
  };
  return props.open ? (
    <div
      ref={overlayRef}
      onClick={(e) => handleOutsideClick(e)}
      className="fixed top-0 right-0 h-full w-full flex justify-center items-center bg-base-300/80 z-10"
    >
      <div className="card w-8/12 bg-base-100 shadow-xl max-h-[80%] overflow-scroll">
        <div className="card-body flex flex-col gap-y-8">
          <h2 className="card-title justify-center lg:justify-start text-3xl">
            Hey !
          </h2>
          <p className="text-center lg:text-left text-xl">
            These job applications are more than 2 weeks old, you should revive
            them !
          </p>
          <div className="flex flex-col gap-y-4">
            {props.jobs.map((job, i) => (
              <div
                key={i}
                className="flex flex-col md:flex-row justify-between items-center bg-base-200 rounded-lg px-4 py-2 cursor-pointer"
                onClick={() => navigate(`/jobs/${job._id}`)}
              >
                <div className="flex flex-col md:flex-row gap-x-5 items-center truncate">
                  <p className="opacity-70">{formatDate(job.createdAt)}</p>
                  <h3 className="text-xl font-semibold uppercase truncate text-ellipsis">
                    {job.company}
                  </h3>
                  <h4 className="text-lg font-medium capitalize truncate text-ellipsis">
                    {job.position}
                  </h4>
                </div>
                {/* todo find way to trigger external links */}
                <a href={job.link} className="text-primary p-0">
                  <FiExternalLink size={20} style={{ padding: 0 }} />
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
};

export default ReviveModal;