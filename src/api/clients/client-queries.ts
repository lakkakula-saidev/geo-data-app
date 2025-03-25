import { Todo } from "../../types/common";
import { apiClient } from "../api-query-client";

export const fetchRoads = async () => {
  const response = await apiClient.get("/roads");
  return response.data;
};

export const fetchTodos = async () => {
  const response = await apiClient.get("/todos");
  return response.data;
};

export const createTodo = async (todo: Todo) => {
  const response = await apiClient.post("/todos", todo);
  return response.data;
};
