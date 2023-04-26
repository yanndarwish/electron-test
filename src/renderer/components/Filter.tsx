import { jobStatusArray } from 'renderer/pages/JobDetail';

export interface IFilterProps {
  active: string;
  setActive: (status: string) => void;
}

const Filter = (props: IFilterProps) => {
  return (
    <div className="my-8 flex gap-8 flex-wrap justify-center md:justify-start">
      {/* Default "All" radio button  */}
      <div className="form-control">
        <label
          className={`cursor-pointer btn hover:opacity-100 ${
            props.active === 'all' ? 'opacity-100' : 'opacity-50'
          }`}
        >
          all
          <input
            type="radio"
            name="status"
            className="hidden"
            onChange={() => props.setActive('all')}
          />
        </label>
      </div>
      {jobStatusArray.map((status, i) => (
        // display other radio buttons dynamically
        <div className="form-control" key={i}>
          <label
            className={`cursor-pointer btn hover:opacity-100 ${
              status === 'pending'
                ? 'btn-accent'
                : status === 'ghosted'
                ? 'btn-error-content'
                : status === 'rejected'
                ? 'btn-error'
                : status === 'interview'
                ? 'btn-success'
                : status === 'test'
                ? 'btn-info'
                : 'btn-secondary'
            } ${props.active === status ? 'opacity-100' : 'opacity-50'}`}
          >
            {status}
            <input
              type="radio"
              name="status"
              className="hidden"
              onChange={() => props.setActive(status)}
            />
          </label>
        </div>
      ))}
    </div>
  );
};

export default Filter;
