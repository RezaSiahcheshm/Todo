/* eslint-disable */
import { useContext, useState } from "react";
import DeleteIcon from "../assets/DeleteIcon";
import EditIcon from "../assets/EditIcon";
import { TodosContext } from "../context/TodosContext";
import { toast } from "react-toastify";

export default function TodoItem({ todo }) {
  const { todosDispatcher } = useContext(TodosContext);
  const [isEditing, setIsEditing] = useState(false);
  const { id ,completed} = todo;

  const modifyTodo = async (event) => {
    const text = event.target.value.trim();
    if (event.key === "Enter" && text !== "") {
      try {
        const res = await fetch(
          `https://669bc6cc276e45187d366d73.mockapi.io/todos/${id}`,
          {
            method: "PUT",
            headers: {
              "Content-type": "application/json; charset=UTF-8",
            },
            body: JSON.stringify({ text }),
          }
        );
        if (res.ok) {
          todosDispatcher({
            type: "MODIFY_TODO",
            payload: { id, text },
          });
          toast.success(`Todo id: ${id} modified successfully`);
          setIsEditing(false);
        } else {
          const error = await res.json();
          toast.error(error.message);
        }
      } catch (e) {
        console.log("Error", e);
        toast.error("Failed to modify todo");
      }
    }
  };

  const toggleCompleted = async () => {
    try {
      const res = await fetch(
        `https://669bc6cc276e45187d366d73.mockapi.io/todos/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
          body: JSON.stringify({ completed: !completed }),
        }
      );
      if (res.ok) {
        todosDispatcher({ type: "TOGGLE_COMPLETED", payload: id });
        toast.success(
          `Todo id ${id} marked as ${
            !completed ? "completed" : "uncompleted"
          }`
        );
      } else {
        const error = await res.json();
        toast.error(error.message);
      }
    } catch (e) {
      console.log("Error", e);
      toast.error("Failed to toggle todo completion");
    }
  };

  const destroyTodo = async () => {
    try {
      const res = await fetch(
        `https://669bc6cc276e45187d366d73.mockapi.io/todos/${id}`,
        {
          method: "DELETE",
          headers: { "Content-type": "application/json; charset=UTF-8" },
        }
      );
      if (res.ok) {
        todosDispatcher({ type: "DELETE_TODO", payload: id });
        toast.success(`Todo id: ${id} deleted successfully`);
      } else {
        const error = await res.json();
        toast.error(error.message);
      }
    } catch (e) {
      console.log("Error", e);
      toast.error("Failed to delete todo");
    }
  };

  return (
    <li className="relative flex items-center justify-between px-2 py-6 border-b">
      {isEditing ? (
        <div className="flex flex-grow w-full items-center justify-between">
          <input
            type="text"
            defaultValue={todo.text}
            onKeyDown={modifyTodo}
            className="flex flex-wrap w-full border border-gray-200 text-gray-800 rounded p-2"
          />
          <DeleteIcon
            className="cursor-pointer ml-2"
            destroyTodo={() => setIsEditing(false)}
          />
        </div>
      ) : (
        <div className="flex flex-grow w-full items-center justify-between">
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={completed}
              onChange={toggleCompleted}
            />
            <p
              className={`inline-block mt-1 ml-2 text-gray-600 ${
                completed ? "line-through" : ""
              }`}
            >
              {todo.text}
            </p>
          </div>
          <div className="flex items-center">
            <EditIcon
              className="cursor-pointer ml-2"
              modifyTodo={() => setIsEditing(true)}
            />
            <DeleteIcon
              className="cursor-pointer ml-2"
              destroyTodo={() => destroyTodo(id)}
            />
          </div>
        </div>
      )}
    </li>
  );
}
