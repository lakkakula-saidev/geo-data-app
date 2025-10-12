import { useEffect, useState } from "react";
import { Feature, LineString, MultiLineString } from "geojson";
import { DataTable } from "./DataTable";

/**
 * Haversine distance in meters between two [lon, lat] coordinate pairs.
 */
const haversine = (a: [number, number], b: [number, number]) => {
  const R = 6371000; // meters
  const toRad = (d: number) => (d * Math.PI) / 180;
  const dLat = toRad(b[1] - a[1]);
  const dLon = toRad(b[0] - a[0]);
  const lat1 = toRad(a[1]);
  const lat2 = toRad(b[1]);

  const h =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(h), Math.sqrt(1 - h));
  return R * c;
};

/**
 * Compute length of a LineString in meters.
 */
const lineStringLength = (geometry: LineString): number => {
  const coords = geometry.coordinates;
  if (coords.length < 2) return 0;
  let total = 0;
  for (let i = 1; i < coords.length; i++) {
    total += haversine(
      coords[i - 1] as [number, number],
      coords[i] as [number, number]
    );
  }
  return total;
};

/**
 * Compute length of a MultiLineString in meters.
 */
const multiLineStringLength = (geometry: MultiLineString): number => {
  return geometry.coordinates.reduce((acc, line) => {
    if (line.length < 2) return acc;
    for (let i = 1; i < line.length; i++) {
      acc += haversine(
        line[i - 1] as [number, number],
        line[i] as [number, number]
      );
    }
    return acc;
  }, 0);
};

/**
 * Calculate (or derive) total distance per street name.
 * Falls back to geometry-derived length when properties.len is missing.
 */
const calculateTotalDistanceByStreetName = (features: Feature[]) => {
  const streetDistances: Record<string, number> = {};

  features.forEach((feature) => {
    const name = feature.properties?.name;
    if (!name || name === "null") return;

    // Prefer provided length if present & numeric
    let distance = 0;
    const propLen = feature.properties?.len;
    if (typeof propLen === "number" && propLen > 0) {
      distance = propLen;
    } else if (feature.geometry) {
      if (feature.geometry.type === "LineString") {
        distance = lineStringLength(feature.geometry as LineString);
      } else if (feature.geometry.type === "MultiLineString") {
        distance = multiLineStringLength(feature.geometry as MultiLineString);
      } else {
        distance = 0;
      }
    }

    streetDistances[name] = (streetDistances[name] || 0) + distance;
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
    if (!features?.length) {
      setTop5Longest([]);
      setTop5Shortest([]);
      return;
    }

    const streetDistances = calculateTotalDistanceByStreetName(features);
    const data = Object.entries(streetDistances)
      .map(([name, totalDistance]) => ({
        name,
        totalDistance
      }))
      // filter out zero-length defensive (e.g., point geometries)
      .filter((d) => d.totalDistance > 0);

    if (!data.length) {
      setTop5Longest([]);
      setTop5Shortest([]);
      return;
    }

    // Sort descending for longest
    const byDesc = [...data].sort((a, b) => b.totalDistance - a.totalDistance);

    // Longest: first 5
    setTop5Longest(byDesc.slice(0, 5));

    // Shortest: sort ascending
    const byAsc = [...data].sort((a, b) => a.totalDistance - b.totalDistance);
    setTop5Shortest(byAsc.slice(0, 5));
  }, [features]);

  const columns: { key: "name" | "totalDistance"; label: string }[] = [
    { key: "name", label: "Street Name" },
    { key: "totalDistance", label: "Total Distance (m)" }
  ];

  // Format distances to whole meters
  const formatRows = (rows: { name: string; totalDistance: number }[]) =>
    rows.map((r) => ({
      ...r,
      totalDistance: Math.round(r.totalDistance)
    }));

  return (
    <div>
      <DataTable
        title="Top 5 Longest Streets"
        data={formatRows(top5Longest)}
        columns={columns}
      />
      <DataTable
        title="Top 5 Shortest Streets"
        data={formatRows(top5Shortest)}
        columns={columns}
      />
    </div>
  );
};

export default StreetDistanceTable;
