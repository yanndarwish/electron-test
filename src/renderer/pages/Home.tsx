import { Chart } from 'react-google-charts';

export const data = [
  ['From', 'To', 'Weight'],
  ['A', 'X', 5],
  ['A', 'Y', 7],
  ['A', 'Z', 6],
  ['B', 'X', 2],
  ['B', 'Y', 9],
  ['B', 'Z', 4],
];

export const options = {};


const Dashboard = () => {

  return (
    <div className="w-full h-full p-8">
      <h1 className="text-4xl font-bold text-primary">Your Dashboard</h1>
      <div className='mt-8'>
        <Chart
          chartType="Sankey"
          width="100%"
          height="60vh"
          data={data}
          options={options}
        />
      </div>
    </div>
  );
};

export default Dashboard;
