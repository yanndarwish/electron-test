export interface IStatBoxProps {
  title: string;
  count: number;
}

const StatBox = (props: IStatBoxProps) => {
  return (
    <div
      className={`${
        props.title === 'total'
          ? 'bg-primary'
          : props.title === 'pending'
          ? 'bg-accent'
          : props.title === 'rejected'
          ? 'bg-error'
          : props.title === 'interview'
          ? 'bg-success'
          : ''
      } p-8 w-36 h-36 rounded-lg drop-shadow-lg`}
    >
      <p className="text-4xl text-center mb-6 font-bold">{props.count}</p>
      <p className="text-xl text-center capitalize">{props.title}</p>
    </div>
  );
};

export default StatBox;
