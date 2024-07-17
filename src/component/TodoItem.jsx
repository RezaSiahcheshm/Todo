/* eslint-disable */
import { useState } from "react";
import DeleteIcon from "../assets/icons/DeleteIcon";
import EditIcon from "../assets/icons/EditIcon";

export default function TodoItem({
  item,
  deleteTodo,
  toggleStatus,
  editTitle,
}) {
  const [isEditing, setIsEditing] = useState(false);

  const handleEditKeyPress = (event) => {
    if (event.key === "Enter" && event.target.value.trim() !== "") {
      editTitle(item.id, event.target.value.trim());
      setIsEditing(false);
    }
  };

  return (
    <li className="relative flex items-center justify-between px-2 py-6 border-b">
      {isEditing ? (
        <div className="w-full flex items-center">
          <input
            type="text"
            defaultValue={item.title}
            onKeyDown={handleEditKeyPress}
            className="w-full px-2 py-2 border border-gray-200 rounded"
          />
          <DeleteIcon className="ml-2 cursor-pointer" onClick={() => setIsEditing(false)} />
        </div>
      ) : (
        <div className="flex items-center w-full">
          <div className="flex items-center flex-grow">
            <input
              type="checkbox"
              checked={item.status}
              onChange={() => toggleStatus(item.id)}
              className=""
            />
            <p
              className={`inline-block mt-1 ml-2 text-gray-600 ${
                item.status ? "line-through" : ""
              }`}
            >
              {item.title}
            </p>
          </div>
          <div className="absolute right-0 flex items-center space-x-1">
            <EditIcon className="cursor-pointer" onClick={() => setIsEditing(true)} />
            <DeleteIcon className="cursor-pointer" onClick={() => deleteTodo(item.id)} />
          </div>
        </div>
      )}
    </li>
  );
}
