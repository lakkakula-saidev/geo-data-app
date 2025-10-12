import { FeatureCollection, Geometry } from "geojson";
import { Todo, RoadFeature } from "../../types/common";

/**
 * Strongly typed roads collection using existing RoadFeature property shape.
 */
type RoadsCollection = FeatureCollection<Geometry, RoadFeature["properties"]>;

/**
 * Shape of db.json when fetched from /public.
 */
interface DbSnapshot {
  roads: RoadsCollection;
  todos: Todo[];
}

/**
 * Fetch the entire db.json once and extract data.
 * db.json must reside in /public (Vite serves it from /db.json).
 */
const loadDb = async (): Promise<DbSnapshot> => {
  // Use Vite's BASE_URL so GitHub Pages sub-path (e.g. /geo-data-app/) is respected.
  // import.meta.env.BASE_URL is typed by Vite; ensure single trailing slash.
  const base = (import.meta.env.BASE_URL || "/").replace(/\/+$/, "/");
  const dbUrl = `${base}db.json`;
  const res = await fetch(dbUrl, { cache: "no-store" });
  if (!res.ok) throw new Error(`Failed to load db.json from ${dbUrl}`);
  const json = (await res.json()) as Partial<DbSnapshot>;
  return {
    roads: (json.roads as RoadsCollection) || {
      type: "FeatureCollection",
      features: []
    },
    todos: json.todos || []
  };
};

export const fetchRoads = async (): Promise<RoadsCollection> => {
  const db = await loadDb();
  return db.roads;
};

export const fetchTodos = async (): Promise<Todo[]> => {
  // Prefer localStorage shadow if present
  const local = localStorage.getItem("todos-shadow");
  if (local) {
    try {
      return JSON.parse(local) as Todo[];
    } catch {
      // ignore parse error and fall back
    }
  }
  const db = await loadDb();
  return db.todos;
};

export const createTodo = async (todo: Todo): Promise<Todo> => {
  const current = await fetchTodos();
  const nextId =
    current.length > 0 ? Math.max(...current.map((t) => t.id || 0)) + 1 : 1;
  const newTodo: Todo = { ...todo, id: nextId };
  const updated = [...current, newTodo];
  localStorage.setItem("todos-shadow", JSON.stringify(updated));
  return newTodo;
};
