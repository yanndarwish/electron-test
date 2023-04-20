export interface IStatBoxProps {
  title: string;
  count: number;
}

const StatBox = (props: IStatBoxProps) => {
  return (
    <div
      className={`${
        props.title === 'total'
          ? 'text-primary'
          : props.title === 'pending'
          ? 'text-accent'
          : props.title === 'rejected'
          ? 'text-error'
          : props.title === 'interview'
          ? 'text-success/80'
          : ''
      } stats shadow-lg w-44 h-32`}
    >
      <div className="stat">
        <p className="stat-title capitalize text-center font-semibold text-xl">
          {props.title}
        </p>
        <p className="stat-value text-center">{props.count}</p>
      </div>
    </div>
  );
};

export default StatBox;
