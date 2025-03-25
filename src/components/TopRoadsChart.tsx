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

interface RoadFeature {
  properties: {
    name: string;
  };
  geometry: {
    type: string;
    coordinates: [number, number][];
  };
}

export const TopRoadsChart = ({ roadData }: { roadData: RoadFeature[] }) => {
  const [chartKey, setChartKey] = useState(0);

  useEffect(() => {
    setChartKey((prev) => prev + 1);
  }, [roadData]);

  const roadCounts: Record<string, number> = {};

  roadData.forEach((road) => {
    const name = road.properties.name || "Unnamed LineStrings";
    const lineCount = road.geometry.coordinates.length;

    if (roadCounts[name]) {
      roadCounts[name] += lineCount;
    } else {
      roadCounts[name] = lineCount;
    }
  });

  const topRoads = Object.entries(roadCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10);

  const data = {
    labels: topRoads.map(([name]) => name),
    datasets: [
      {
        label: "LineString Count",
        data: topRoads.map(([_, count]) => count),
        backgroundColor: "rgba(204, 153, 255, 1)",
        borderColor: "rgba(126, 34, 206, 1)",
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
          text: "Road Names"
        }
      },
      y: {
        type: "linear" as const,
        beginAtZero: true,
        title: {
          display: true,
          text: "LineString Count"
        }
      }
    }
  };

  return (
    <div>
      <h4 className="text-xl font-semibold text-gray-800 dark:text-white my-5">
        Top 10 Roads with Most LineStrings
      </h4>
      <Bar key={chartKey} data={data} options={options} />
    </div>
  );
};
