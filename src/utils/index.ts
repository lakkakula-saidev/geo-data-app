import { Feature } from "geojson";
import { RoadFeature } from "../types/common";

const tailwindColors: Record<string, string> = {
  blue: "rgb(59, 130, 246)",
  lightGreen: "rgb(134, 239, 172)",
  darkGreen: "rgb(22, 101, 52)",
  yellow: "rgb(253, 224, 71)",
  red: "rgb(239, 68, 68)"
};

export const getColor = (grade: number): string => {
  if (grade < 1.5) return tailwindColors.blue;
  if (grade < 2.5) return tailwindColors.lightGreen;
  if (grade < 3.5) return tailwindColors.darkGreen;
  if (grade < 4.5) return tailwindColors.yellow;
  return tailwindColors.red;
};

export const geoJSONStyle = (feature?: RoadFeature) => {
  if (!feature || !feature.properties?.eemi_grade) return {};

  const grade = feature.properties.eemi_grade.gw;
  return {
    color: getColor(grade),
    opacity: 0.8,
    weight: 5
  };
};

export const calculateAverages = (data: Feature[]) => {
  const totals: Record<string, number> = {};
  const counts: Record<string, number> = {};

  data.forEach((feature) => {
    if (!feature.properties?.eemi_grade) return;

    for (const key in feature.properties.eemi_grade) {
      if (key !== "sub_type_grades") {
        const value =
          feature.properties.eemi_grade[
            key as keyof typeof feature.properties.eemi_grade
          ];
        if (typeof value === "number") {
          totals[key] = (totals[key] || 0) + value;
          counts[key] = (counts[key] || 0) + 1;
        }
      }
    }
  });

  return Object.keys(totals).reduce((acc, key) => {
    acc[key] = totals[key] / counts[key];
    return acc;
  }, {} as Record<string, number>);
};
