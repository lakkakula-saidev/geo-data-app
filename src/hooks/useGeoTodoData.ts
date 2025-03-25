import { useQuery } from "@tanstack/react-query";
import { fetchRoads, fetchTodos } from "../api/clients/client-queries";

export const useRoadsQuery = () => {
  return useQuery({ queryKey: ["roads-data"], queryFn: fetchRoads });
};

export const useTodosQuery = () => {
  return useQuery({ queryKey: ["todos"], queryFn: fetchTodos });
};
