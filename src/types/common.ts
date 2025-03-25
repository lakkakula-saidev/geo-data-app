import { Feature, Geometry } from "geojson";

export interface EEMIGrade {
  gw: number;
  twgeb: number;
  twofs: number;
  twrio: number;
  twsub: number;
  tweben: number;
  sub_type_grades: Record<string, number>;
}

export type RoadFeature = Feature<
  Geometry,
  { eemi_grade?: EEMIGrade; name: string; fid: number }
>;

export interface Todo {
  id?: number;
  title: string;
  description: string;
  status: "Ausstehend" | "In Planung" | "Abgeschlossen";
  author: string;
  road_fid: number | null;
}
