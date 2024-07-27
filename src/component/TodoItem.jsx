/* eslint-disable */
import { useState } from "react";
import DeleteIcon from "../assets/DeleteIcon";
import EditIcon from "../assets/EditIcon";

export default function TodoItem({
  todo,
  destroyTodo,
  toggleCompleted,
  modifyTodo,
}) {
  const [isEditing, setIsEditing] = useState(false);

  const handleEnterKeyPress = (modifiedTodo) => {
    if (
      modifiedTodo.key === "Enter" &&
      modifiedTodo.target.value.trim() !== ""
    ) {
      modifyTodo(todo.id, modifiedTodo.target.value.trim());
      setIsEditing(false);
    }
  };

  return (
    <li className="relative flex items-center justify-between px-2 py-6 border-b">
      {isEditing ? (
        <div className="flex flex-grow w-full items-center justify-between">
          <input
            type="text"
            defaultValue={todo.text}
            onKeyDown={handleEnterKeyPress}
            className="flex flex-wrap w-full border border-gray-200  text-gray-800 rounded p-2 "
          />
          <DeleteIcon
            className="cursor-pointer ml-2"
            destroyTodo={() => setIsEditing(false)}
          />
        </div>
      ) : (
        <div className="flex flex-grow w-full items-center justify-between">
          <div className="flex">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleCompleted(todo)}
            />
            <p
              className={`inline-block mt-1 ml-2 text-gray-600 ${
                todo.completed ? "line-through" : ""
              }`}
            >
              {todo?.text}
            </p>
          </div>
          <div className="flex items-center">
            <EditIcon
              className="cursor-pointer ml-2"
              modifyTodo={() => setIsEditing(true)}
            />
            <DeleteIcon
              className="cursor-pointer ml-2"
              destroyTodo={() => destroyTodo(todo.id)}
            />
          </div>
        </div>
      )}
    </li>
  );
}
