import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

import { Bar } from 'react-chartjs-2';
import { formatCurrency } from '../utils/formatCurrency';

const SubscriptionChart = ({ subscriptions, currencies }) => {
  const chartData = {
    labels: subscriptions.map(sub => sub.name),
    datasets: [{
      label: 'Subscription Costs',
      data: subscriptions.map(sub => sub.amount),
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0']
    }]
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Subscription Cost Breakdown</h2>
      <div className="h-96">
        <Bar
          data={chartData}
          options={{
            maintainAspectRatio: false,
            plugins: {
              tooltip: {
                callbacks: {
                  label: (context) => {
                    const sub = subscriptions[context.dataIndex];
                    return `${sub.name}: ${formatCurrency(sub.amount, sub.currency, currencies)}`;
                  }
                }
              }
            }
          }}
        />
      </div>
    </div>
  );
};

export default SubscriptionChart;
