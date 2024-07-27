/* eslint-disable */
import { useContext, useState } from "react";
import DeleteIcon from "../assets/DeleteIcon";
import EditIcon from "../assets/EditIcon";
import { TodosContext } from "../context/TodosContext";
import { toast } from "react-toastify";
import React from "react";

function TodoItem({ todo }) {
  const { id, text, completed } = todo;
  const { todosDispatcher } = useContext(TodosContext);
  const [isEditing, setIsEditing] = useState(false);

  const apiRequest = async (url, method, body) => {
    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json; charset=UTF-8" },
        body: JSON.stringify(body),
      });
      if (res.ok) {
        return await res.json();
      } else {
        const error = await res.json();
        throw new Error(error.message);
      }
    } catch (e) {
      toast.error(e.message || "Something went wrong");
      throw e;
    }
  };

  const modifyTodo = async (event) => {
    const modifyText = event.target.value.trim();
    if (event.key === "Enter" && modifyText !== "") {
      try {
        await apiRequest(
          `https://669bc6cc276e45187d366d73.mockapi.io/todos/${id}`,
          "PUT",
          { modifyText }
        );
        todosDispatcher({
          type: "MODIFY_TODO",
          payload: { id, text: modifyText },
        });
        toast.success(`Todo id: ${id} modified successfully`);
        setIsEditing(false);
      } catch (e) {
        console.log("Error", e);
      }
    }
  };

  const toggleCompleted = async () => {
    try {
      await apiRequest(
        `https://669bc6cc276e45187d366d73.mockapi.io/todos/${id}`,
        "PUT",
        { completed: !completed }
      );
      todosDispatcher({ type: "TOGGLE_COMPLETED", payload: id });
      toast.success(
        `Todo id ${id} marked as ${!completed ? "completed" : "uncompleted"}`
      );
    } catch (e) {
      console.log("Error", e);
    }
  };

  const destroyTodo = async () => {
    try {
      await apiRequest(
        `https://669bc6cc276e45187d366d73.mockapi.io/todos/${id}`,
        "DELETE"
      );
      todosDispatcher({ type: "DELETE_TODO", payload: id });
      toast.success(`Todo id: ${id} deleted successfully`);
    } catch (e) {
      console.log("Error", e);
    }
  };

  return (
    <li className="relative flex items-center justify-between px-2 py-6 border-b">
      {isEditing ? (
        <div className="flex flex-grow w-full items-center justify-between">
          <input
            type="text"
            defaultValue={text}
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
              {text}
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

export default React.memo(TodoItem);
