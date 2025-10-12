import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Todo } from "../types/common";
import { createTodo } from "../api/clients/client-queries";

/**
 * Mutation hook to create a todo using localStorage-backed createTodo helper.
 * Invalidates the "todos" query so dependent UI updates.
 */
export const useCreateTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (todo: Todo) => createTodo(todo),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
    onError: (error) => {
      console.error("Error creating TODO:", error);
    }
  });
};
