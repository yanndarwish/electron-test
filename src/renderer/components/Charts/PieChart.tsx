import { IJobResponse } from 'renderer/interfaces';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartOptions,
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export interface IPieChartProps {
  jobs: IJobResponse[];
}

const options: ChartOptions<'doughnut'> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'right',
      labels: {
        color: '#F8F8F8',
      },
    },
  },
};

const PieChart = (props: IPieChartProps) => {
  const data = {
    labels: ['Pending', 'Rejected', 'Interview', 'Test', 'Ghosted'],
    datasets: [
      {
        data: [
          props.jobs.filter((item) => item.status === 'pending').length,
          props.jobs.filter((item) => item.status === 'rejected').length,
          props.jobs.filter((item) => item.status === 'interview').length,
          props.jobs.filter((item) => item.status === 'test').length,
          props.jobs.filter((item) => item.status === 'ghosted').length,
        ],
        backgroundColor: [
          '#FFB86C',
          'rgba(255, 86, 85, 1)',
          '#4BCF6D',
          'rgba(54, 162, 235, 1)',
          '#414558',
        ],
      },
    ],
  };
  return <Doughnut data={data} options={options} />;
};

export default PieChart;
