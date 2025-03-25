import {
  Button,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  Select,
  Textarea,
  TextInput
} from "flowbite-react";
import { useEffect, useState } from "react";

import { Todo } from "../types/common";
import { useCreateTodo } from "../hooks/todoMutation";

interface TodoModalProps {
  isOpen: boolean;
  onClose: () => void;
  roadFid: number | null;
}

export const TodoModal: React.FC<TodoModalProps> = ({
  isOpen,
  onClose,
  roadFid
}) => {
  const createTodoMutation = useCreateTodo();

  const [todo, setTodo] = useState<Todo>({
    title: "",
    description: "",
    status: "Ausstehend",
    author: "",
    road_fid: roadFid
  });

  useEffect(() => {
    setTodo((prevTodo) => ({
      ...prevTodo,
      road_fid: roadFid
    }));
  }, [roadFid]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setTodo({ ...todo, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (todo.title.trim() === "" || todo.road_fid === null) return;
    createTodoMutation.mutate(todo, {
      onSuccess: onClose
    });
  };

  return (
    <Modal show={isOpen} size="lg" onClose={onClose} popup>
      <ModalHeader className="bg-white rounded-t-lg">
        <div className="p-5">
          <h3 className="text-2xl font-medium text-gray-900 dark:text-white">
            Add a To-Do
          </h3>
        </div>
      </ModalHeader>
      <ModalBody>
        <div className="space-y-4">
          <div>
            <Label htmlFor="title">Title</Label>
            <TextInput
              id="title"
              name="title"
              value={todo.title}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              value={todo.description}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <Label htmlFor="author">Author</Label>
            <TextInput
              id="author"
              name="author"
              value={todo.author}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <Label htmlFor="status">Status</Label>
            <Select
              id="status"
              name="status"
              value={todo.status}
              onChange={handleChange}
            >
              <option value="Ausstehend">Ausstehend</option>
              <option value="In Planung">In Planung</option>
              <option value="Abgeschlossen">Abgeschlossen</option>
            </Select>
          </div>

          <div>
            <Label htmlFor="road_fid">Road ID</Label>
            <TextInput
              id="road_fid"
              name="road_fid"
              type="number"
              value={roadFid || ""}
              disabled={true}
            />
          </div>

          <div className="flex justify-between py-5">
            <Button
              onClick={handleSubmit}
              disabled={createTodoMutation.isPending}
            >
              {createTodoMutation.isPending ? "Saving..." : "Save"}
            </Button>
            <Button color="gray" onClick={onClose}>
              Cancel
            </Button>
          </div>
        </div>
      </ModalBody>
    </Modal>
  );
};
