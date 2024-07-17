/* eslint-disable  */
import { useState } from "react";
import DeleteIcon from "../assets/icons/DeleteIcon";
import EditIcon from "../assets/icons/EditIcon";

export default function TodoListItem({
  item,
  deleteTodo,
  statusHandler,
  editTitleHandler,
}) {
  const [editMode, setEditMode] = useState(false);
  const editTodoHandler = (event) => {
    if (event.key == "Enter") {
      editTitleHandler(item.id, event.target.value);
      setEditMode(false)
    }
  };

  return (
    <li className="relative flex items-center justify-between px-2 py-6 border-b">
      {editMode ? (
        <div className="w-full flex items-center">
          <input
            type="text"
            defaultValue={item.title}
            onKeyDown={editTodoHandler}
            className="w-full px-2 py-2 border border-gray-200 rounded"
          />
          <DeleteIcon className="ml-2" onClick={() => setEditMode(false)} />
        </div>
      ) : (
        <div className="flex items-center">
          <div>
            <input
              type="checkbox"
              checked={item?.status}
              onChange={() => statusHandler(item.id)}
              className=""
            />
            <p
              className={`inline-block mt-1 ml-2 text-gray-600 ${
                item?.status ? "line-through" : ""
              }`}
            >
              {item?.title}
            </p>
          </div>
          <button
            type="button"
            className="absolute right-0 flex items-center space-x-1"
          >
            <EditIcon onClick={() => setEditMode(true)} />
            <DeleteIcon onClick={() => deleteTodo(item.id)} />
          </button>
        </div>
      )}
    </li>
  );
}
