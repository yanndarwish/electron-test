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
          ? 'bg-success/80'
          : ''
      } p-8 w-36 h-36 rounded-lg drop-shadow-lg relative flex justify-center items-center`}
    >
      <p className="text-4xl text-center font-bold">{props.count}</p>
      <p className="absolute top-4 text-xl text-center font-semibold capitalize">{props.title}</p>
    </div>
  );
};

export default StatBox;
