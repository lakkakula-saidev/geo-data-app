import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { useEffect, useState } from "react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const GradeAverageChart = ({
  averages
}: {
  averages: Record<string, number>;
}) => {
  const [chartKey, setChartKey] = useState(0);

  useEffect(() => {
    setChartKey((prev) => prev + 1);
  }, [averages]);

  const data = {
    labels: Object.keys(averages),
    datasets: [
      {
        label: "Average Grades",
        data: Object.values(averages),
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1
      }
    ]
  };

  const options = {
    responsive: true,
    scales: {
      x: {
        type: "category" as const,
        title: {
          display: true,
          text: "EEMI Grade Types"
        }
      },
      y: {
        type: "linear" as const,
        beginAtZero: true,
        title: {
          display: true,
          text: "Average Grades"
        }
      }
    }
  };

  return (
    <div>
      <h4 className="text-xl font-semibold text-gray-800 dark:text-white my-5">
        EEMI grade averages
      </h4>
      <Bar key={chartKey} data={data} options={options} />
    </div>
  );
};
