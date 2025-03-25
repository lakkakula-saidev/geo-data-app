import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Todo } from "../types/common";
import { apiClient } from "../api/api-query-client";

const createTodo = async (todo: Todo) => {
  const response = await apiClient.post("/todos", todo);
  return response.data;
};

export const useCreateTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
    onError: (error) => {
      console.error("Error creating TODO:", error);
    }
  });
};
