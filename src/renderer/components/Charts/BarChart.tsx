import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { IJobResponse } from 'renderer/interfaces';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options: ChartOptions<'bar'> = {
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
      position: 'right',
      labels: {
        color: '#F8F8F8',
      },
    },
  },
  elements: {
    bar: {
      borderWidth: 2,
      borderSkipped: 'bottom',
      borderRadius: 10,
    },
  },
  responsive: true,
  scales: {
    x: {
      display: false,
      stacked: true,
    },
    y: {
      display: false,
      stacked: true,
    },
  },
};

const labels = ['Job Applications'];

export interface IBarChartProps {
  jobs: IJobResponse[];
}

const BarChart = (props: IBarChartProps) => {
  const pendingCount = props.jobs.filter(
    (item) => item.status === 'pending'
  ).length;
  const rejectedCount = props.jobs.filter(
    (item) => item.status === 'rejected'
  ).length;
  const ghostedCount = props.jobs.filter(
    (item) => item.status === 'ghosted'
  ).length;
  const interviewCount = props.jobs.filter(
    (item) => item.status === 'interview'
  ).length;
  const testCount = props.jobs.filter((item) => item.status === 'test').length;

  const data = {
    labels,
    datasets: [
      {
        label: 'Pending',
        data: [pendingCount],
        backgroundColor: '#FFB86C',
        borderColor: '#F8F8F8',
      },
      {
        label: 'Rejected',
        data: [rejectedCount],
        backgroundColor: 'rgba(255, 86, 85, 1)',
        borderColor: '#F8F8F8',
      },
      {
        label: 'Ghosted',
        data: [ghostedCount],
        backgroundColor: '#414558',
        borderColor: '#F8F8F8',
      },
      {
        label: 'Interview',
        data: [interviewCount],
        backgroundColor: '#4BCF6D',
        borderColor: '#F8F8F8',
      },
      {
        label: 'Test',
        data: [testCount],
        backgroundColor: 'rgba(54, 162, 235, 1)',
        borderColor: '#F8F8F8',
      },
    ],
  };
  return <Bar options={options} data={data} height={'400px'} />;
};

export default BarChart;
