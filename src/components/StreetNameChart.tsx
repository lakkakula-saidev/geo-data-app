import { useEffect, useState } from "react";
import { Feature } from "geojson";
import { DataTable } from "./DataTable";

const calculateTotalDistanceByStreetName = (features: Feature[]) => {
  const streetDistances: { [key: string]: number } = {};

  features.forEach((feature) => {
    const name = feature.properties?.name;
    if (name && name !== "null") {
      const distance = feature.properties?.len ?? 0;
      streetDistances[name] = (streetDistances[name] || 0) + distance;
    }
  });

  return streetDistances;
};

export const StreetDistanceTable = ({ features }: { features: Feature[] }) => {
  const [top5Longest, setTop5Longest] = useState<
    { name: string; totalDistance: number }[]
  >([]);
  const [top5Shortest, setTop5Shortest] = useState<
    { name: string; totalDistance: number }[]
  >([]);

  useEffect(() => {
    const streetDistances = calculateTotalDistanceByStreetName(features);
    const data = Object.keys(streetDistances).map((name) => ({
      name,
      totalDistance: streetDistances[name]
    }));

    const sortedStreets = data.sort(
      (a, b) => b.totalDistance - a.totalDistance
    );

    setTop5Longest(sortedStreets.slice(0, 5));
    setTop5Shortest(sortedStreets.slice(-5));
  }, [features]);

  const columns = [
    { key: "name", label: "Street Name" },
    { key: "totalDistance", label: "Total Distance (m)" }
  ];

  return (
    <div>
      <h4 className="text-xl font-semibold text-gray-800 dark:text-white my-5">
        Top 5 Longest Streets
      </h4>
      <DataTable
        title="Top 5 Longest Streets"
        data={top5Longest}
        columns={columns}
      />

      <h4 className="text-xl font-semibold text-gray-800 dark:text-white my-5">
        Top 5 Shortest Streets
      </h4>
      <DataTable
        title="Top 5 Shortest Streets"
        data={top5Shortest}
        columns={columns}
      />
    </div>
  );
};

export default StreetDistanceTable;
